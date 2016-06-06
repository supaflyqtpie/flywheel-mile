const express = require('express');
const router = express.Router();

module.exports = function sessionRoutes(passport) {
  // Create user session: post /session
  router.post('/', passport.authenticate('auth'), (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
    });
  });

  // Destroy user session: destroy /session
  router.delete('/', (req, res) => {
    req.session.destroy((err) => {
      res.end();
    });
  });

  return router;
};
