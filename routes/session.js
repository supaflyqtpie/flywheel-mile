const express = require('express');
const router = express.Router();

module.exports = function sessionRoutes(passport) {
  // Create user session
  router.post('/session', (req, res, next) => {
    passport.authenticate('auth', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ email: user.email, id: user.id });
      });
    })(req, res, next);
  });

  // Delete user session
  router.delete('/session', (req, res) => {
    req.session.destroy((err) => {
      res.end();
    });
  });

  return router;
};
