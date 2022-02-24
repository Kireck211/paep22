const {getJSON, saveJSON} = require('../utils/fileHelpers');

const locationController = {
  list: function() {
    const locations = getJSON();
    return locations;
  },
  getIndex: function(locationName) {
    const locations = getJSON();
    const index = locations.findIndex(({name}) => locationName === name);
    return index;
  },
  get: function(locationName) {
    const locations = getJSON();
    const foundLocation = locations.find(({name}) => locationName === name);
    const location = foundLocation || {};
    return location;
  },
  create: function(latitude, longitude, name) {
    const location = {latitude, longitude, name};
    const locations = getJSON();
    locations.push(location);
    saveJSON(locations);
    return location;
  },
  update: function(name, latitude, longitude) {
    const locations = getJSON();
    const location = this.get(name);
    location.latitude = latitude || user.latitude;
    location.longitude = longitude || user.longitude;
    const index = this.getIndex(name);
    if (index >= 0) {
      locations[index] = {...locations[index], ...location};
      saveJSON(locations);
      return locations[index];
    }
    return location;
  },
  delete: function(name) {
    const locations = getJSON();
    const index = this.getIndex(name);
    if (index > 0) {
      const location = locations.splice(index, 1);
      saveJSON(locations);
      return location;
    }
    return {};
  }
};

module.exports = locationController;