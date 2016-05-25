const express = require('express');
const router = express.Router();

module.exports = function sessionRoutes(passport) {
  /* POST for authenticating user */
  router.post('/create', (req, res, next) => {
    // TODO: add validation for form fields

    passport.authenticate('auth', (err, user, info) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (!user) {
        res.render('landing_page');
      } else {
        req.login(user, () => {
          res.redirect('/users');
        });
      }
    })(req, res, next);
  });

  router.post('/destroy', (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/');
    });
  });

  return router;
};
