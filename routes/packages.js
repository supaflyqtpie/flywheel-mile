const express = require('express');
const router = express.Router();
const handleAuthentication = require('../middleware/handleAuthentication');
const Package = require('../models').Package;

// All routes below require authentication
router.use(handleAuthentication);

// Get the user's package list
router.get('/packages', (req, res, next) => {
  res.json(req.user.packages);
});

// Create a new package for the user
router.post('/packages', (req, res, next) => {
  Package.create(req.package).then((item) => {
    req.user.packages.push(item);
    res.json(item);
  }).catch((err) => {
    next(new Error('Failed to create new package'));
  });
});

router.param('id', (req, res, next, id) => {
  req.user.findById(id).then((item) => {
    req.package = item; // eslint-disable-line no-param-reassign
    next();
  }).catch((err) => {
    next(new Error('Failed to find package'));
  });
});

// Get the a user's package by id
router.get('/packages/:id', (req, res, next) => {
  res.json(req.package);
});

// Delete the a user's package by id
router.delete('/packages/:id', (req, res, next) => {
  req.package.delete();
  res.status(204).end();
});

module.exports = router;
