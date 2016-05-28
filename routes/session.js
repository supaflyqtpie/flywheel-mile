const express = require('express');
const router = express.Router();

module.exports = function sessionRoutes(passport) {
  // Create user session: post /session
  router.post('/', passport.authenticate('auth'), (req, res) => {
    res.json(req.user);
  });

  // Destroy user session: destroy /session
  router.destroy('/', (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/');
    });
  });

  return router;
};
