const express = require('express');
const router = express.Router();
const User = require('../models').User;

// Create a new user: post /user
router.post('/', (req, res, next) => {
  const postData = req.body;
  if (postData.password !== postData.confirmPassword) {
    res.status(422).send({ message: 'Passwords do not match.' });
  }

  User.createUser(postData.email, postData.password).then((user) => {
    req.login(user, (err) => {
      if (err) {
        next(err);
      } else {
        res.status(201).json({
          id: user.id,
          email: user.email,
        });
      }
    });
  }).catch((exception) => {
    console.log(exception);
    res.status(422).send({ message: 'Unable to create User.' });
  });
});

module.exports = router;
