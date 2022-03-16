const Location = require('../models/schemas/Location');
const {NotFoundError} = require('../utils/errors');

const locationController = {
  list: function() {
    return Location.find();
  },
  get: async function(locationName) {
    const location = await Location.findOne({name: locationName});
    if (location === null)
      return Promise.reject(new NotFoundError(`Location ${locationName}`));
    return location;
  },
  create: async function(properties) {
    try {
      const location = await Location.create(properties);
      return location;
    } catch (err) {
      return Promise.reject(new Error('Could not created location,' + err));
    }
  },
  update: async function(name, latitude, longitude) {
    try {
      const location = await Location.findOne({name});
      if (location === null) {
        return Promise.reject(new NotFoundError(`Location ${name}`));
      }
      location.latitude = latitude;
      location.longitude = longitude;
      await location.save();
      return location;
    } catch (err) {
      return Promise.reject(new Error(`Could not udpate location ${name}, ${err}`));
    }
  },
  delete: async function(name) {
    try {
      await Location.findOneAndRemove({name});
    } catch (err) {
      return Promise.reject(new Error(`Could not delete location ${name}, ${err}`));
    }
  }
};

module.exports = locationController;