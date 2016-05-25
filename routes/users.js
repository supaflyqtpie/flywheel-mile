const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

/* GET users listing. */
router.get('/', isAuthenticated, (req, res) => {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  res.render('navBar');
});

module.exports = router;
