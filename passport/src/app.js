const express = require('express');
const path = require('path');
const cookieSeesion = require('cookie-session');
const passport = require('passport');
require('dotenv').config();

const authRoute = require('./routes/auth.route');
const app = express();
require('./config/passport');

app.use(cookieSeesion({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['passwordKey']
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/public/html/home.html');
});

app.use('/auth', authRoute);

module.exports = app;
