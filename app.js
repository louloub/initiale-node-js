// app.js
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();
const connection = require("./connection");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// WORKING ON = actualy can actualise price of bitcoin on database from 
// COINGECKO online price
app.post(`/cryptolist`, async (request, response) => {
  console.log("request.body ==> ", request.body);
  console.log("request.body ID ==> ", request.body.id);

  try {
    const {
      id: id,
      actualPrice: actualPrice,
    } = request.body;
    const cryptoResult = await connection.query(
      `UPDATE crypto SET actualPrice = ${actualPrice} WHERE id = ${id}`,
      [{ actualPrice}]
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

// DONT WORK PUT - modifie actualPrice
// app.put(`/changeActualPrice/:cryptoId`, async (request, response) => {
//   response.send("in put request");
//   try {
//     const { cryptoId } = req.params;
//     await connection.query("UPDATE crypto SET ? where id=?", [
//       { ...req.body },
//       cryptoId
//     ]);
//     res.status(200).json({ id: cryptoId, ...req.body });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("error modifying crypto");
//   }
// });

// DONT WORK POST - Retrieve all of the data from your table
// app.post(`/crypto/actualPrice/:id`, (request, response) => {
//   const id = request.params;
//   console.log("in", id);
//   try {
//     connection.query(`SELECT * FROM crypto`, (err, results) => {
//       console.log("result ==> ", results);
//       response.status(200).json(results);
//     });
//   } catch (err) {
//     response.status(404).json({ error: "Crypto not found" });
//     console.log("err => ", err);
//   }
// });

module.exports = app;
