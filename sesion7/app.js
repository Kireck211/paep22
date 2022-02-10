const express = require('express');

const logger = require('./middlewares/logger');
const users = require('./routes/users');
const locations = require('./routes/locations');

const app = express();

app.use(express.json());
app.use(logger());

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.use('/users', users);
app.use('/locations', locations);

module.exports = app;