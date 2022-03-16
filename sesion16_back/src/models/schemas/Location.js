const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  longitude: {
    type: Number,
    min: -180,
    max: 180
  },
  latitude: {
    type: Number,
    min: -90,
    max: 90
  },
  name: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
