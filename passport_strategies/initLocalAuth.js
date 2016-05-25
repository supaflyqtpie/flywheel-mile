const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');

module.exports = function localAuthStrategy(passport) {
  passport.use('auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    models.User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      // Username does not exist, log the error and redirect back
      if (!user) {
        return done(null, false, {
          message: 'Get REKT son',
        });
      }
      // User and password both match, return user from done method
      // which will be treated like success
      console.log(`Successfully Authenticated:  + ${user.email}`);
      return done(null, user);
    });
  }));

  passport.serializeUser((user, done) => {
    const sessionUser = {
      id: user.id,
      email: user.email,
    };
    done(null, sessionUser);
  });

  passport.deserializeUser((sessionUser, done) => {
    done(null, sessionUser);
  });
};
