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

// POST new crypto in db
app.post(`/cryptolist/newCrypto`, async (request, response) => {
  console.log("--- in new crypto ---");
  console.log("--- request.body.newCoin ==> ", request.body.newCoin);
  try {
    console.log("BACK in TRY ");
    const { name, coin, type, description } = request.body.newCoin;
    await connection.query(`INSERT INTO crypto SET ?`, [
      { name, coin, type, description }
    ]);
    console.log("BACK in end TRY ");
  } catch (err) {
    console.log(err);
  }
});

// POST - Actualise crypto price with COINGECKO online price
app.post(`/cryptoListPrice`, async (request, response) => {
  try {
    const {
      id: id,
      actualPrice: actualPrice,
      marketCap: marketCap
    } = request.body;
    console.log("BACK cryptoId ==> ", id);
    console.log("BACK actualPrice ==> ", actualPrice);
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

// POST Actualise crypto market cap with COINGECKO online price
app.post(`/cryptoListMarketCap`, async (request, response) => {
  try {
    const { id: id, marketCap: marketCap } = request.body;
    console.log("BACK cryptoId ==> ", id);
    console.log("BACK marketCap ==> ", marketCap);
    const cryptoResult = await connection.query(
      `UPDATE crypto SET marketCap = ${marketCap} WHERE id = ${id}`,
      [{ marketCap }]
    );

    return response.status(200).json({
      data: {
        marketCap
      },
      message: "🎉 Successfully saved crypto list with new market cap"
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
