const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// const logger = require('./middlewares/logger');
const swaggerSetup = YAML.load('./src/docs/swagger.yaml');
const users = require('./routes/users');
const locations = require('./routes/locations');
const {NotFoundError} = require('./utils/errors');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
// app.use(logger());

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.use('/users', users);
app.use('/locations', locations);

app.use((err, req, res, next) => {
  if (err.details) return res.status(400).send(err.details[0].message);
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
  res.status(503).send('Oooops something went wrong, try again');
});

module.exports = app;