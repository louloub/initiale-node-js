const connection = require("./src/config");
const express = require("express");
// const movies = require("./movies");
// const users = require("./users");

const port = 3000;
const app = express();

app.use(express.json()) // For JSON format

function logInfos(req, res, next) {
  console.log(`${req.method} request from ${req.hostname}`);
  next();
}

app.use(logInfos); 


app.listen(port, () => {
    console.log(`Server is runing on ${port}`);
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });
  
