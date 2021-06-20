// app.js
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();
const connection = require("./connection");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET - Retrieve all of the data from your table
app.get("/cryptoList", (request, response) => {
  try {
    connection.query(`SELECT * FROM crypto`, (err, results) => {
      response.status(200).json(results);
    });
  } catch (err) {
    response.status(404).json({ error: "Crypto not found" });
    console.log("err => ", err);
  }
});

// POST - new crypto in db
app.post(`/cryptolist/newCrypto`, async (request, response) => {
  try {
    console.log("BACK in TRY ");
    const { name, coin, type, description, actualPrice, marketCap } = request.body.newCoin;
    await connection.query(`INSERT INTO crypto SET ?`, [
      { name, coin, type, description, actualPrice, marketCap }
    ]);
    console.log("BACK in end TRY ");
  } catch (err) {
    console.log(err);
  }
});

// POST - Actualise crypto price and marketcap with COINGECKO online price
app.post(`/updateCrypto`, async (request, response) => {
  try {
    const {
      id: id,
      actualPrice: actualPrice,
      marketCap: marketCap
    } = request.body;
    const cryptoResult = await connection.query(
      `UPDATE crypto SET actualPrice = ${actualPrice}, marketCap = ${marketCap} WHERE id = ${id}`,
      [{ actualPrice }]
    );

    return response.status(200).json({
      data: {
        actualPrice
      },
      message: "🎉 Successfully saved crypto list with new price"
    });
  } catch (err) {
    console.log(err);
  }
});

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

module.exports = app;
