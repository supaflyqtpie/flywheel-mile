import { expect } from 'chai';
import db from '../../models/index';
import { setupDB } from '../utils';
const Package = db.package;
const User = db.user;

describe('Package Model', () => {
  beforeEach(setupDB);

  describe('belongs to user', () => {
    it('should show which user it belongs to', () => {
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
