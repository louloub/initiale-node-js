// index.js
const app = require('./app');

const port = process.env.SERVER_PORT;

app.listen(port, (err) => {
  if (err) {
    throw new Error(`An error occurred: ${err.message}`);
  }
  console.log(`Server is listening on ${port}`);
});
