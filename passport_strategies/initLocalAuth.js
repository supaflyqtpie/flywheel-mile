LocalStrategy = require('passport-local').Strategy;
var models = require('../models');

module.exports = function(passport) {

    passport.use('auth', new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function(req, email, password, done) {
        models.User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            // Username does not exist, log the error and redirect back
            if (!user) {
                return done(null, false, { message: "Get REKT son" });
            }
            // User and password both match, return user from done method
            // which will be treated like success
            console.log("Successfully Authenticated: " + user.email);
            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done) {
        var sessionUser = { id: user.id, email: user.email };
        done(null, sessionUser);
    });

    passport.deserializeUser(function(sessionUser, done) {
        done(null, sessionUser);
    });
};
