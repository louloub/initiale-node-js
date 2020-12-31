// app.js
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const connection = require('./connection');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// -----------
// --- GET ---
// -----------

// GET - Retrieve all of the data from your table
app.get("/", (request, response) => {
    connection.query(`SELECT * from pet`, (err, results) => {
        if (err == null && results == "") {
          response.status(404).json({ error: 'Pet not found' });
        } else {
          response.status(200).json(results);
        }
      });
  });

// GET - Retrieve specific fields (i.e. id, names, dates, etc.)
app.get("/:name", (request, response) => {
    connection.query(`SELECT name, owner from pet`, (err, results) => {
        if (err == null && results == "") {
          response.status(404).json({ error: 'Pet not found' });
        } else {
          response.status(200).json(results);
        }
      });
  });

// GET - A filter for data that contains
app.get("/contain/:name", (request, response) => {
    let name = request.params.name
    connection.query(`SELECT * from pet WHERE name LIKE '%${name}%'`, (err, results) => {
        if (err == null && results == "") {
          response.status(404).json({ error: 'Pet not found' });
        } else {
          response.status(200).json(results);
        }
      });
  });  

// GET - A filter for data that starts with
app.get("/startWith/:name", (request, response) => {
    let name = request.params.name
    connection.query(`SELECT * from pet WHERE name LIKE '${name}%'`, (err, results) => {
        console.log("result => " +results+ " name => " +request.params.name+ " err => " +err)
        if (err == null && results == "") {
          response.status(404).json({ error: 'Pet not found' });
        } else {
          response.status(200).json(results);
        }
      });
  });  

// GET - A filter for data that is greater than...
app.get("/ageGreaterThan/:age", (request, response) => {
    let age = request.params.age
    connection.query(`SELECT * from pet WHERE age >= '${age}'`, (err, results) => {
        console.log("result => " +results+ " name => " +request.params.name+ " err => " +err)
        if (err == null && results == "") {
          response.status(404).json({ error: 'Pet not found' });
        } else {
          response.status(200).json(results);
        }
      });
  });    

// GET - Ordered data recovery (i.e. ascending, descending) -
app.get("/ordered/:ord", (request, response) => {
    let ord = request.params.ord
    console.log("ord ==> " +ord)
    connection.query(`SELECT * from pet ORDER BY birth ${ord}`, (err, results) => {
        if (err == null && results == "") {
          response.status(404).json({ error: 'Pet not found' });
        } else {
          response.status(200).json(results);
        }
      });
  }); 

// ------------
// --- POST ---
// ------------

// POST - Insertion of a new entity
app.post('/pet', (req, res) => {
    const { name, owner, species, sex, birth, death, age, funny } = req.query;
    if (!name || !owner || !species || !sex || !birth || !death || !age || !funny ) {
        return res.status(422).json({ error: 'required field(s) missing' });
    } else {
        connection.query(`INSERT INTO pet (name, owner, species, sex, birth, death, age, funny) 
        VALUES (?,?,?,?,?,?,?,?)`,
        [name, owner, species, sex, birth, death, age, funny] ,
        (err, results) => {
            if (err) {
              res.status(500).send("Error saving a pet");
            } else {
              res.status(200).send("Successfully saved");
            }
          }
      ); 
    }
});

// -----------
// --- PUT ---
// -----------

// PUT - Modification of an entity // localhost:3000/pet/1
app.put("/pet/:id", (req, res) => {
    // We get the ID from the url:
    const idUser = req.params.id;
    // We send a UPDATE query to the DB
    connection.query(
      "UPDATE pet SET ? WHERE id= ? ;",
      [newUser, idUser],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error updating a user");
        } else {
          res.status(200).send("User updated successfully 🎉");
        }
      }
    );
  });

// PUT - Toggle a Boolean  // pet/changeToggle/:id
app.put("/pet/changeToggle/:id", (req, res) => {
    // We get the ID from the url:
    const idUser = req.params.id;
    // We send a UPDATE query to the DB
    connection.query(
      `UPDATE pet SET funny = !funny WHERE id = ${idUser};`,
      [idUser],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error updating a user");
        } else {
          res.status(200).send("User updated successfully 🎉");
        }
      }
    );
  });  

// ---------------------
// --- DELETE METHOD ---
// ---------------------

// DELETE - Delete an entity // localhost:3000/pet/delete/1
app.delete("/pet/delete/:id", (req, res) => {
    const idUser = req.params.id; 
    connection.query("DELETE FROM pet WHERE id = ?", [idUser], (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting an pet");
      } else {
        res.status(200).send("🎉 Pet deleted!");
      }
    });
  });

// DELETE - Delete all entities where boolean value is false
app.delete("/pet/deleteAllFalse/", (req, res) => {
    const idUser = req.params.id; 
    connection.query("DELETE FROM pet WHERE funny = 1", [idUser], (err) => {
        if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting an pet");
        } else {
        res.status(200).send("🎉 Pet deleted!");
        }
    });
});

module.exports = app;
