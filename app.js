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
      console.log("result ==> " ,results)
      response.status(200).json(results);
    });
  } catch (err) {
    response.status(404).json({ error: "Crypto not found" });
    console.log("err => ", err);
  }
});

module.exports = app;
