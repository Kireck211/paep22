const router = require('express').Router();
const passport = require('passport');
// path: auth/

router.get('/login', (req, res) => {
  res.redirect('/public/html/login.html');
});

router.get('/google/login', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/auth/login'}) ,(req, res) => {
  console.log(req.user);
  res.redirect('/');
});

router.get('/verifyLogin', (req, res) => {
  if (req.user) {
    return res.status(200).send('Logged In');
  }
  res.status(403).send('Not Authorized');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

module.exports = router;
