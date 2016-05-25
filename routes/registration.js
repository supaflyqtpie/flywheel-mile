const express = require('express');
const router = express.Router();
const User = require('../models').User;

module.exports = function registrationRoute(passport) {
  // Post /register
  router.post('/', (req, res, next) => {
    const postData = req.body;
    if (postData.password !== postData.confirmPassword) {
      res.status(422).send({ error: 'Passwords do not match.' });
      return;
    }

    User.createUser(postData.email, postData.password).then(() => {
      passport.authenticate('auth', (err, user, info) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        // could be an issue
        req.login(user, () => {
          res.status(201).send({ email: user.email });
        });
      })(req, res, next);
    }).catch((exception) => {
      console.log(exception);
      res.status(422).send({ error: 'Unable to create User.' });
    });
  });

  return router;
};
