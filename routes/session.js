const express = require('express');
const router = express.Router();

module.exports = function sessionRoutes(passport) {
  // Create user session: post /session
  router.post('/', (req, res, next) => {
    passport.authenticate('auth', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ success: false, message: info.message });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, email: user.email, id: user.id });
      });
    })(req, res, next);
  });

  // Destroy user session: destroy /session
  router.delete('/', (req, res) => {
    req.session.destroy((err) => {
      res.end();
    });
  });

  return router;
};
