const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

// const logger = require('./middlewares/logger');
const usersRoute = require('./routes/users.route');
const locationsRoute = require('./routes/locations.route');
const {NotFoundError} = require('./utils/errors');

const app = express();
const swaggerDocument = YAML.load('src/docs/swagger.yaml');
require('./config/db');
const User = require('./models/schemas/User');

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/TSP-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/uploader', (req, res) => {
  res.redirect('/public/html/uploader.html');
});

app.use('/users', usersRoute);
app.use('/locations', locationsRoute);

app.use((err, req, res, next) => {
  console.log('Error', err);
  if (err.details) return res.status(400).send(err.details[0].message);
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
  res.status(503).send('Oooops something went wrong, try again');
});

module.exports = app;
