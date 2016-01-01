import { expect } from 'chai';
import db from '../../models/index';
import { setupDB } from '../utils';
import { origin, destination } from './package.spec';
const Package = db.package;
const PackageHistory = db.packageHistory;

const statusDate = new Date();
const city = 'Mint';
const state = 'CA';
const zip = '22222';
const country = 'Altoids';
const status = 'Transit';
const statusDetail = 'In transit';

const eta = '2016-06-03T15:21:00Z';
const serviceLevel = 'priority';

describe('PackageHistory Model', () => {
  beforeEach(setupDB);

  describe('PackageHistory Functions', () => {
    describe('createPackageHistory', () => {
      it('should be able to create a packageHistory', () => {
        return PackageHistory.createPackageHistory(statusDate, city, state, zip, country, status, statusDetail).then(item => {
          expect(item.statusDate).to.equal(statusDate);
          expect(item.city).to.equal(city);
          expect(item.state).to.equal(state);
          expect(item.zip).to.equal(zip);
          expect(item.country).to.equal(country);
          expect(item.status).to.equal(status);
          expect(item.statusDetail).to.equal(statusDetail);
        });
      });
    });
  });

  describe('belongs to package', () => {
    it('should show which package it belongs to', () => {
      return PackageHistory.create({
        statusDate,
        city,
        state,
        zip,
        country,
        status,
        statusDetail,
        package: {
          trackingNumber: 'kamehameha',
          carrier: 'piccolo',
          originCity: origin.city,
          originCountry: origin.country,
          destinationCity: destination.city,
          destinationCountry: destination.country,
          eta,
          serviceLevel,
        },
      }, {
        include: [Package],
      }).then(history => {
        expect(history).to.exist;
        return history.getPackage().then((item) => {
          expect(item).to.exist;
        });
      });
    });
  });
});
