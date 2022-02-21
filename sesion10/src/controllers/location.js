const {getJSON, saveJSON} = require('../utils/fileHelpers');

const locationController = {
  list: function() {
    const data = getJSON();
    return data.locations;
  },
  getIndex: function(locationName) {
    const data = getJSON();
    const index = data.locations.findIndex(({name}) => locationName === name);
    return index;
  },
  get: function(locationName) {
    const data = getJSON();
    const foundLocation = data.locations.find(({name}) => locationName === name);
    const location = foundLocation || {};
    return location;
  },
  create: function(latitude, longitude, name) {
    const location = {latitude, longitude, name};
    const data = getJSON();
    data.locations.push(location);
    saveJSON(data);
    return location;
  },
  update: function(name, latitude, longitude) {
    const data = getJSON();
    const location = this.get(name);
    location.latitude = latitude || user.latitude;
    location.longitude = longitude || user.longitude;
    const index = this.getIndex(name);
    if (index >= 0) {
      data.locations[index] = {...data.locations[index], ...location};
      saveJSON(data);
      return data.locations[index];
    }
    return location;
  },
  delete: function(name) {
    const data = getJSON();
    const index = this.getIndex(name);
    if (index > 0) {
      const location = data.locations.splice(index, 1);
      saveJSON(data);
      return location;
    }
    return {};
  }
};

module.exports = locationController;