import { expect } from 'chai';
import db from '../../models/index';
import { setupDB } from '../utils';
const Package = db.package;
const User = db.user;

describe('Package', () => {
  beforeEach(setupDB);
  beforeEach(setupDB);

  describe('#UserPackageAssociation', () => {
    it('should be able to belong to a user on create', () => {
      const trackingNumber = 'flywheelpackage';
      const carrier = 'usps';
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
        item.getUser().then((user) => {
          expect(user).to.exist;
        });
      });
    });
  });
});
