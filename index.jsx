const connection = require("./src/config");
const express = require("express");

const port = 3000;
const app = express();

app.use(express.json()) // For JSON format

function logInfos(req, res, next) {
  console.log(`${req.method} request from ${req.hostname}`);
  next();
}

app.use(logInfos); 

// Port listen
app.listen(port, () => {
    console.log(`Server is runing on ${port}`);
  });

// Connection  
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
  
// --- TDD ---

const assert = require('assert');

// --- MY TESTING FUNCTION ---
function capitalizeFirstLetters(input){
  if (input.length > 0 && !input.includes(" ")) {
    return input[0].toUpperCase() + input.slice(1)
  } else if (input === "") {
    console.log("----------- in first elsif")
    return ""
  } else if (input.length > 0 && input.includes(" ")) {
    let wordsArray = input.split(" ");
    for (let i = 0; i < wordsArray.length; i++) {
      wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].substr(1);
    }
    return wordsArray.join(' ');
  }
}
assert.strictEqual(capitalizeFirstLetters(''), '');
assert.strictEqual(capitalizeFirstLetters('javaScript'), 'JavaScript');
assert.strictEqual(capitalizeFirstLetters('javaScript cest trop cool'), 'JavaScript Cest Trop Cool');

// --- testing function example ---
function capitalizeFirst(input) {
  return input.length > 0
    ? input[0].toUpperCase() + input.slice(1)
    : '';
}

// Check that capitalizeFirst is a function
assert.strictEqual(typeof capitalizeFirst, 'function');

// Check that capitalizeFirst accepts one argument
assert.strictEqual(capitalizeFirst.length, 1);

// Check that capitalizeFirst transforms javaScript correctly
assert.strictEqual(capitalizeFirst('javaScript'), 'JavaScript');

// Check that it works for a 1-character string
assert.strictEqual(capitalizeFirst('z'), 'Z');

// Check that it works for an empty string
assert.strictEqual(capitalizeFirst(''), '');