const express = require('express');
const router = express.Router();
const User = require('../models').User;

// Create a new user: post /user
router.post('/', (req, res, next) => {
  const postData = req.body;
  if (postData.password !== postData.confirmPassword) {
    res.status(422).send({ error: 'Passwords do not match.' });
  }

  User.createUser(postData.email, postData.password).then((user) => {
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).send();
    });
  }).catch((exception) => {
    console.log(exception);
    return res.status(422).send({ error: 'Unable to create User.' });
  });
});

module.exports = router;
