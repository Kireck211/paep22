const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

const port = process.env.PORT || 3000;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `http://localhost:${port}/auth/google/callback`
    },
    function(accessToken, refreshToken, profile, done) {
      const newUser = {
        id: profile._json.sub,
        email: profile._json.email,
        imageUrl: profile._json.picture
      };
      console.log('profile', profile);
      User.find(profile.id)
        .then(user => {
          return user
        }).catch(() => {
          return User.create(newUser);
        }).then(user => {
          done(null, user);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log('serializing', user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('deserializing', id);
  User.find(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});
