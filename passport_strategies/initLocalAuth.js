const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').user;

module.exports = function localAuthStrategy(passport) {
  passport.use('auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    User.findByEmail(email).then((user) => {
      if (!user) {
        console.log(`Email does not exist: ${email}`);
        done(null, false, {
          message: 'Incorrect Username or Password',
        });
      } else {
        User.comparePassword(password, user.password).then((success) => {
          if (success) {
            console.log(`Successfully Authenticated: ${user.email}`);
            done(null, user);
          } else {
            console.log(`Incorrect password for user: ${user.email}`);
            done(null, false, {
              message: 'Incorrect Username or Password',
            });
          }
        });
      }
    }).catch((err) => {
      console.log(err);
      done(err);
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
