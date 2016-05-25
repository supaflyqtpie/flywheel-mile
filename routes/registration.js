const express = require('express');
const router = express.Router();
const UserModelProxy = require('../seed/UserModelProxy');

module.exports = function registrationRoute(passport) {
  router.post('/', (req, res, next) => {
    const postData = req.body;
    if (postData.password !== postData.confirmPassword) {
      res.send('passwords do not match');
      return;
    }

    UserModelProxy.insertUser(postData.email,
      postData.password).then(() => {
        passport.authenticate('auth', (err, user, info) => {
          if (err) {
            console.log(err);
            return next(err);
          }

          req.login(user, () => {
            res.redirect('/users');
          });
        })(req, res, next);
      });
  });

  return router;
};
