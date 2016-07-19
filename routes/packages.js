const express = require('express');
const router = express.Router();
const handleAuthentication = require('../middleware/handleAuthentication');
const Package = require('../models').package;
import { shippoGet } from '../shippoAPIRequestHandler';

// All routes below require authentication
router.use(handleAuthentication);

// Get the user's package list
router.get('/packages', (req, res, next) => {
  req.user.getPackages().then((packages) => res.json(packages)).catch((err) => {
    res.status(422).json({ message: 'Unexpected error occured while retrieving packages' });
  });
});

// Create a new package for the user
router.post('/packages', (req, res, next) => {
  const newPackage = req.body.package;
  shippoGet(newPackage.carrier, newPackage.trackingNumber).then((response) => {
    response.json().then((json) => {
      // If carrier is invalid, shippo will return 404 with body-parser
      // If carrier is valid but not tracking number, shippo will return null
      // tracking_status. This is the only known behavior so far...
      if (!response.ok || !json || !json.tracking_status) {
        res.status(422).json({ message: 'Could not get package from Shippo' });
      } else {
        Package.create(newPackage).then((item) => {
          req.user.addPackage(item).then(() => {
            res.json(item);
          });
        }).catch((err) => {
          res.status(422).json({ message: 'Unable to create package' });
        });
      }
    });
  }).catch((err) => {
    res.status(422).json({ message: err }); // error with shippo
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
  req.package.destroy().catch((err) => {
    res.status(422).json({ message: 'Unexpected error occured while deleting package' });
  });
  res.status(204).end();
});

// Get the user's package history for a particular package
router.get('/packages/:id/packageHistory', (req, res, next) => {
  req.package.getPackageHistories().then((hist) => {
    if (hist) {
      res.json(hist);
    } else {
      res.status(404).json({ message: 'No history found for package' });
    }
  }).catch((err) => {
    res.status(422).json({ message: 'Unexpected error occured while fetching package history' });
  });
});

module.exports = router;
