// app.js
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();
const connection = require("./connection");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DELETE crytpo
app.delete("/cryptolist/:cryptoId", async (request, response) => {
  try {
    const { cryptoId } = request.params;
    await connection.query("DELETE FROM crypto WHERE id=?", [cryptoId]);
    response.sendStatus(204);
  } catch (err) {
    console.log(err);
    response.status(500).send("😱 Error delete crypto");
  }
});

// GET - Retrieve all of the data from your table
app.get("/cryptolist", (request, response) => {
  console.log("in");
  try {
    connection.query(`SELECT * FROM crypto`, (err, results) => {
      console.log("result ==> ", results);
      response.status(200).json(results);
    });
  } catch (err) {
    response.status(404).json({ error: "Crypto not found" });
    console.log("err => ", err);
  }
});

// POST new crypto in db
app.post(`/cryptolist/newCrypto`, async (request, response) => {
  console.log("newCrypto request.body ==> ", request.body.newCoin);
  try {
    const {
      name,
      coin,
      type,
      description
    } = request.body.newCoin
    console.log(name)
    const addNewCrypto = await connection.query(
      `INSERT INTO crypto SET ?`,
      [{name,coin,type,description}]
    );
  } catch (err) {
    console.log(err)
  }
});

// POST Actualise crypto price with COINGECKO online price
app.post(`/cryptolist`, async (request, response) => {
  try {
    const { id: id, actualPrice: actualPrice } = request.body;
    const cryptoResult = await connection.query(
      `UPDATE crypto SET actualPrice = ${actualPrice} WHERE id = ${id}`,
      [{ actualPrice }]
    );

    return response.status(200).json({
      data: {
        actualPrice
      },
      message: "🎉 Successfully saved crypto list"
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
