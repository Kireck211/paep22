const express = require('express');
const router = express.Router();

const PetController = require('../controllers/pet.controller');
const petController = new PetController();
// path prefix /pets

// GET pets
router.get('/', (req, res) => {
  res.send(petController.list());
});

// GET pets/:name
router.get('/:name', (req, res) => {
  const { params: {name}} = req;
  res.send(petController.getPet(name));
});

// POST pets/
router.post('/', (req, res) => {
  const {body} = req;
  res.send(petController.create(body));
});

// PUT pets/:name
router.put('/:name', (req, res) => {
  const {body, params: {name}} = req;
  res.send(petController.update(name, body));
});

// DELETE pets/:name
router.delete('/:name', (req, res) => {
  const {params: {name}} = req;
  res.send(petController.delete(name));
});

module.exports = router;
