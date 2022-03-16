const {getJSON, saveJSON} = require('../utils/fileHelpers');
const {NotFoundError} = require('../utils/errors');
const User = require('../models/schemas/User');
const Location = require('../models/schemas/Location');

const locationController = require('./location.controller');

const userController = {
  saveProfilePicture: function(url) {
    const data = getJSON();
    data.profilePicutre = url;
    saveJSON(data);
  },
  getProfilePicture: function() {
    const data = getJSON();
    return data.profilePicutre || '';
  },
  list: function() {
    // TODO 2
    // get all the Users from the database
    return null;
  },
  getById: async function(identifier) {
    const user = await User.findById(identifier);
    return user;
  },
  get: function(username) {
    return User.findOne({username});
  },
  getUserLocations: async function(username) {
    // TODO 3
    // get the User with their locations
    // tip: you can use populate
    return await User.findOne({username}).populate('locations');
  },
  create: async function(name, lastName, username, email) {
    // TODO 4
    // Save the user
    // return the saved user
    // return null;
    return User.create({name, lastName, username, email});
  },
  update: async function(username, propertiesToUpdate) {
    // TODO 5
    // Find the user
    // if the user is found update it and return it
    // else return Promise.reject throw new NotFoundError(`user with the username: ${username}`)
    return null;
  },
  delete: async function(username) {
    // TODO 6
    // Find and delete the user
    // if the user is not found return Promise.reject throw new NotFoundError(`user with the username: ${username}`)
    return null;
  },
  addLocation: async function(username, locationName) {
    // TODO 7
    // Find the User
    // Find the Location
    // if not found the user or location return Promise.reject
    // add the location to the user
    // save the user
    // return the user
    return null;
  },
  removeLocation: async function(username, locationName) {
    // TODO 8
    // Find the User
    // Find the Location
    // if not found the user or location return Promise.reject
    // remove the location hint: use pull from mongoose
    // save the user
    // return the user
    return null;
  }
};

module.exports = userController;
