const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
require('dotenv').config();

// const logger = require('./middlewares/logger');
const swaggerSetup = YAML.load('./src/docs/swagger.yaml');
const usersRoute = require('./routes/users.route');
const locationsRoute = require('./routes/locations.route');
const {NotFoundError} = require('./utils/errors');

const app = express();

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

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
