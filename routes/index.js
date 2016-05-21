const express = require('express');
const router = express.Router();

module.exports = function(passport) {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('landing_page');
  });

    /* POST for authenticating user */
    router.post('/', function(req, res, next) {
        //TODO: add validation for form fields

        passport.authenticate('auth', function(err, user, info) {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                req.flash('messages', { "success": "just kidding" });
                res.locals.messages = req.flash();
                res.render('index', {
                    title: 'Express'
                });
            } else {
                req.login(user, function() {
                    res.redirect('/users');
                });
            }
        })(req, res, next);
    });

    return router;
};
