import { expect } from 'chai';
import db from '../../models/index';
import { setupDB } from '../utils';
const User = db.user;
const Package = db.package;
const PackageHistory = db.packageHistory;

const trackingNumber = 'flywheelpackage';
const carrier = 'usps';
const eta = '2016-06-03T15:21:00Z';
const serviceLevel = 'priority';

export const origin = {
  city: 'Fremont',
  state: 'CA',
  country: 'US',
};
export const destination = {
  city: 'Portland',
  state: 'OR',
  country: 'US',
};

describe('Package Model', () => {
  beforeEach(setupDB);

  describe('Package Functions', () => {
    describe('createPackage', () => {
      it('should be able to create a package', () => {
        return Package.createPackage(trackingNumber, carrier, origin, destination, eta, serviceLevel).then(item => {
          expect(item.trackingNumber).to.equal(trackingNumber);
          expect(item.carrier).to.equal(carrier);
          expect(item.originCity).to.equal(origin.city);
          expect(item.originState).to.equal(origin.state);
          expect(item.originCountry).to.equal(origin.country);
          expect(item.destinationCity).to.equal(destination.city);
          expect(item.destinationState).to.equal(destination.state);
          expect(item.destinationCountry).to.equal(destination.country);
        });
      });
    });
  });

  describe('belongs to user', () => {
    it('should show which user it belongs to', () => {
      return Package.create({
        trackingNumber,
        carrier,
        originCity: origin.city,
        originCountry: origin.country,
        destinationCity: destination.city,
        destinationCountry: destination.country,
        user: {
          email: 'Son@goku.dbz',
          password: 'over9000',
        },
        eta,
        serviceLevel,
      }, {
        include: [User],
      }).then(item => {
        expect(item).to.exist;
        return item.getUser().then((user) => {
          expect(user).to.exist;
        });
      });
    });
  });

  describe('has many packageHistories', () => {
    it('should return a package\'s history', () => {
      return Package.create({
        trackingNumber,
        carrier,
        originCity: origin.city,
        originCountry: origin.country,
        destinationCity: destination.city,
        destinationCountry: destination.country,
        eta,
        serviceLevel,
        packageHistories: [
          { statusDate: new Date(), city: 'dog', state: 'cat', zip: 'hamster', country: 'bird', status: 'fish', statusDetail: 'snake' },
          { statusDate: new Date(), city: 'camel', state: 'turtle', zip: 'lizard', country: 'snail', status: 'starfish', statusDetail: 'squid' },
        ],
      }, {
        include: [PackageHistory],
      }).then(item => item.getPackageHistories().then(histories => {
        expect(histories.length).to.be.equal(2);
      }));
    });
  });
});
