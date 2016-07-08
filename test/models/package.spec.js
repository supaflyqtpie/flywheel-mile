import { expect } from 'chai';
import db from '../../models/index';
import { setupDB } from '../utils';
const User = db.user;
const Package = db.package;
const PackageHistory = db.packageHistory;

const trackingNumber = 'flywheelpackage';
const carrier = 'usps';

describe('Package Model', () => {
  beforeEach(setupDB);

  describe('belongs to user', () => {
    it('should show which user it belongs to', () => {
      return Package.create({
        trackingNumber,
        carrier,
        user: {
          email: 'Son@goku.dbz',
          password: 'over9000',
        },
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
