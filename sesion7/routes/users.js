const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')
// path prefix /users

// GET users
router.get('/', (req, res) => {
  res.send(userController.list());
});

// GET users/:username
router.get('/:username', (req, res) => {
  const {username} = req.params;
  res.send(userController.get(username));
});

// GET users/:username/locations
router.get('/:username/locations', (req, res) => {
  const {username} = req.params;
  res.send(userController.getUserLocations(username));
});

// POST users/ body(name, lastName, username)
router.post('/', (req, res) => {
  const {body: {name, lastName, username}} = req;
  res.send(userController.create(name, lastName, username));
});

// PUT users/:username body(name, lastName)
router.put('/:username', (req, res) => {
  const {username} = req.params;
  const {body: {name, lastName}} = req;
  res.send(userController.update(username, name, lastName));
});

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