const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const userController = require('../controllers/user.controller')
const quotesController = require('../controllers/quotes.controller');
const {uploadLocal} = require('../utils/multer');
// path prefix /users

router.post('/profilePictureLocal', uploadLocal.single('profilePicture'), (req, res) => {
  console.log(req.file);
  const path = req.file.path.replace('src/', '');
  userController.saveProfilePicture(`http://localhost:3000/${path}`);
  res.redirect('/public/html/profile.html');
});

router.get('/', handleError(async (req, res) => {
  const quote = await quotesController.getTechnologyQuote();
  res.send({quote, users: userController.list()});
}));

router.get('/getProfilePicture', (req, res) => {
  res.send({url: userController.getProfilePicture()});
});

router.get('/:username', handleError(async (req, res) => {
  const {username} = req.params;
  const user = await userController.get(username);
  res.send(user);
}));

// GET users/:username/locations
router.get('/:username/locations', handleError(async (req, res) => {
  const {username} = req.params;
  const user = await userController.getUserLocations(username);
  res.send(user);
}));

// POST users/ body(name, lastName, username)
router.post('/', handleError(async (req, res, next) => {
  const {body: {name, lastName, username, email}} = req;
  const user = await userController.create(name, lastName, username, email)
  res.send(user);
}));

// PUT users/:username body(name, lastName)
router.put('/:username', handleError(async (req, res, next) => {
  const {username} = req.params;
  const user = await userController.update(username, req.body);
  res.send(user);
}));

// DELETE users/:username
router.delete('/:username', handleError(async (req, res) => {
  const {username} = req.params;
  await userController.delete(username);
  res.status(204).send();
}));

// PUT users/:username/addLocation/:name
router.put('/:username/addLocation/:name', handleError(async (req, res) => {
  const {username, name} = req.params;
  const user = await userController.addLocation(username, name)
  res.send(user);
}));

// PUT users/:username/removeLocation/:name
router.put('/:username/removeLocation/:name', handleError(async (req, res) => {
  const {username, name} = req.params;
  const user = await userController.removeLocation(username, name)
  res.send(user);
}));

module.exports = router;
