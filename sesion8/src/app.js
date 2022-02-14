const express = require('express');

const petsRoute = require('./routes/pet.route');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.use('/pets', petsRoute);

// Handle errors with express
// app.use........

module.exports = app;
