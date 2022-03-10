const mongoose = require('mongoose');
const User = require('./User');

const locationSchema = new mongoose.Schema({
  longitude: {
    type: Number,
    min: -180,
    max: 180,
    required: true
  },
  latitude: {
    type: Number,
    min: -90,
    max: 90,
    required: true
  },
  name: {
    type: String,
    minlength: 3
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
});

locationSchema.methods.normalize = function() {
  const normalizedLatitude = (this.latitude + 90) / (90 - (-90));
  const normalizedLongitude = (this.longitude + 180) / (180 - (-180));
  return { normalizedLatitude, normalizedLongitude };
};

locationSchema.statics.findOneByName = function(name) {
  return this.findOne({name});
};

locationSchema.query.byName = function(name) {
  return this.where({name});
};

locationSchema.virtual('readable').get(function() {
  return `${this.name} is at ${this.latitude},${this.longitude}`;
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
