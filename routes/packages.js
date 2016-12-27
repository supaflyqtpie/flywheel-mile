const express = require('express');
const router = express.Router();
const handleAuthentication = require('../middleware/handleAuthentication');
const Package = require('../models').package;
const PackageHistory = require('../models').packageHistory;
import { shippoGet } from '../util/shippoAPIRequestHandler';

router.post('/queryPackage', (req, res, next) => {
  const data = req.body.package;
  shippoGet(data.carrier, data.trackingNumber).then((response) => {
    res.json(response);
  });
});

// All routes below require authentication
router.use(handleAuthentication);

// Get the user's package list
router.get('/packages', (req, res, next) => {
  req.user.getPackages().then((packages) => {
    return res.json(packages);
  }).catch((err) => {
    res.status(422).json({ message: 'Unexpected error occured while retrieving packages' });
  });
});

// Create a new package for the user
router.post('/packages', (req, res, next) => {
  const newPackage = req.body.package;
  shippoGet(newPackage.carrier, newPackage.trackingNumber).then((json) => {
    console.log(json);
    Package.create(newPackage).then((item) => {
      req.user.addPackage(item);
      return item;
    }).then((item) => {
      PackageHistory.createFromShippoResponse(item.id, json).then((history) => {
        res.json({
          id: item.id,
          carrier: item.carrier,
          trackingNumber: item.trackingNumber,
          history,
        });
      }).catch((err) => {
        console.log(err);
        res.status(422).json({ message: 'help' });
      });
    }).catch((err) => {
      res.status(422).json({ message: 'Unable to create package' });
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
  req.package.getPackageHistories({ order: '"statusDate" DESC' }).then((hist) => {
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
