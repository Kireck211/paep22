const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME || '';
const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

const dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.yp3ii.mongodb.net/${DB_NAME}`;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log(`Moongose connection open to ${dbURI}`);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose connection diconnected through app termination');
    process.exit(0);
  });
});
