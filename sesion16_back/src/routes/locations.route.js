const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const locationController = require('../controllers/location.controller');
// path prefix /locations

// GET locations
router.get('/', handleError(async (req, res) => {
  const locations = await locationController.list();
  res.send(locations);
}));

// GET locations/:name
router.get('/:name', handleError(async (req, res) => {
  const {name} = req.params;
  const location = await locationController.get(name);
  res.send(location);
}));

// POST locations/ body(latitude, longitude, name)
router.post('/', handleError(async (req, res) => {
  const location = await locationController.create(req.body)
  res.send(location);
}));

// PUT locations/:name body(latitude, longitude)
router.put('/:name', handleError(async (req, res) => {
  const {params: {name}, body: {longitude, latitude}} = req;
  const location = await locationController.update(name, latitude, longitude);
  res.send(location);
}));

// DELETE locations/:name
router.delete('/:name', handleError(async (req, res) => {
  const {name} = req.params;
  await locationController.delete(name);
  res.status(204).send();
}));

module.exports = router;