const router = require('express').Router();
const passport = require('passport');
// path: auth/

// GET /login
router.get('/login', (req, res) => {
  res.redirect('/public/html/login.html');
});

// GET /google/login
router.get('/google/login', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// GET /google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/auth/login'}) ,(req, res) => {
  console.log('inside /auth/google/callback');
  console.log(req.user)
  res.redirect('/');
});

// GET /verifyLogin
router.get('/verifyLogin', (req, res) => {
  if (req.user) {
    return res.status(200).send('Logged In');
  }
  res.status(401).send('Not Authorized');
});

// GET /logout
router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

module.exports = router;
