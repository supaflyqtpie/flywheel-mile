const express = require('express');
const router = express.Router();
const handleAuthentication = require('../middleware/handleAuthentication');
const Package = require('../models').package;

// All routes below require authentication
router.use(handleAuthentication);

// Get the user's package list
router.get('/packages', (req, res, next) => {
  req.user.getPackages().then((packages) => res.json(packages));
});

// Create a new package for the user
router.post('/packages', (req, res, next) => {
  Package.create(req.package).then((item) => {
    req.user.setPackages(item).then(() => res.json(item));
  }).catch((err) => {
    next(new Error('Failed to create new package'));
  });
});

router.param('id', (req, res, next, id) => {
  req.user.getPackages({ where: { id } }).then((packages) => {
    if (packages.length !== 1) {
      throw new Error('Failed to find package');
    } else {
      req.package = packages[0]; // eslint-disable-line no-param-reassign
      next();
    }
  }).catch((err) => {
    next(err);
  });
});

// Get the a user's package by id
router.get('/packages/:id', (req, res, next) => {
  res.json(req.package);
});

// Delete the a user's package by id
router.delete('/packages/:id', (req, res, next) => {
  req.package.destroy();
  res.status(204).end();
});

module.exports = router;
