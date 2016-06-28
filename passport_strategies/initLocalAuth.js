const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;

module.exports = function localAuthStrategy(passport) {
  passport.use('auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    User.findByEmail(email).then((user) => {
      if (!user) {
        console.log(`Email does not exist: ${email}`);
        return done(null, false, {
          message: 'Get REKT son',
        });
      }
      console.log(`Successfully Authenticated: ${user.email}`);
      return done(null, user);
    }).catch((err) => {
      console.log(err);
      return done(err);
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
};
