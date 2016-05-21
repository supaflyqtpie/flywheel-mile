var express = require('express');
var router = express.Router();
var UserModelProxy = require('../UserModelProxy');

module.exports = function(passport) {
    /* GET registraiton page. */
    router.get('/', function(req, res, next) {
        res.render('registration', {
            title: 'Express'
        });
    });

    router.post('/', function(req, res, next) {
        var postData = req.body;
        if (postData.password !== postData.confirmPassword) {
            res.send("passwords do not match");
            return;
        }

        UserModelProxy.insertUser(postData.email,
            postData.password).then(function() {
            passport.authenticate('auth', function(err, user, info) {
                if (err) {
                    console.log(err);
                    return next(err);
                }

                req.login(user, function() {
                    res.redirect('/users');
                });
            })(req, res, next);
        });
    });

    return router;
};
