const express = require('express');
const axios = require('axios');

const app = express();

const AwaitHOF = require('./utils/hof');
const locationController = require('./controllers/location.controller');

app.get('/locations', AwaitHOF(async (req, res) => {
  const quote = await axios.get('https://api.quotable.io/random?tags=technology');
  console.log(quote);
  const response = {
    locations: locationController.list(),
    quote 
  };
  res.send(response);
}));

module.exports = app;