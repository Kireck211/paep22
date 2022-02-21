const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const userController = require('../controllers/user')
const {createSchema, updateSchema} = require('../models/schemas/user');
// path prefix /users

// GET users
router.get('/', (req, res) => {
  res.send(userController.list());
});

// GET users/:username
router.get('/:username', handleError((req, res) => {
  const {username} = req.params;
  res.send(userController.get(username));
}));

// GET users/:username/locations
router.get('/:username/locations', (req, res) => {
  const {username} = req.params;
  res.send(userController.getUserLocations(username));
});

// POST users/ body(name, lastName, username)
router.post('/', handleError((req, res, next) => {
  const {body: {name, lastName, username, locations}} = req;
  const {error} = createSchema.validate({name, lastName, username, locations});
  if(error) return next(error);
  res.send(userController.create(name, lastName, username, locations));
}));

// PUT users/:username body(name, lastName)
router.put('/:username', handleError((req, res, next) => {
  const {username} = req.params;
  const {body: {name, lastName}} = req;
  const {error} = updateSchema.validate({name, lastName, username});
  if(error) return next(error);
  res.send(userController.update(username, name, lastName));
}));

// DELETE users/:username
router.delete('/:username', (req, res) => {
  const {username} = req.params;
  res.send(userController.delete(username));
});

// PUT users/:username/addLocation/:name
router.put('/:username/addLocation/:name', (req, res) => {
  const {username, name} = req.params;
  res.send(userController.addLocation(username, name));
});

// PUT users/:username/removeLocation/:name
router.put('/:username/removeLocation/:name', (req, res) => {
  const {username, name} = req.params;
  res.send(userController.removeLocation(username, name));
});

module.exports = router;