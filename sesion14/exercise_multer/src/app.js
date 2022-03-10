const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

const {NotFoundError} = require('./utils/errors');

const app = express();
const swaggerDocument = YAML.load('src/docs/swagger.yaml');

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/template-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/uploader', (req, res) => {
  res.redirect('/public/html/uploader.html');
});

// 4. app.post for /profilePicture with multer middleware from utils/multer.js
// 5. Inside the (req, res) callback function save the file path to
//    a local file src/data/data.json

app.get('/profile', (req, res) => {
  res.redirect('/public/html/profile.html');
});

app.get('/getProfilePicture', (req, res) => {
  // 6. finish the implementation to obtain the saved profilePicture,
  //    you can use fileHelpers
});

app.use((err, req, res, next) => {
  console.log('Error', err);
  if (err.details) return res.status(400).send(err.details[0].message);
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
  res.status(503).send('Oooops something went wrong, try again');
});

module.exports = app;
