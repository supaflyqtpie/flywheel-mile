import { expect } from 'chai';
import db from '../../models/index';
const Package = db.Package;

describe('Package', () => {
  beforeEach(() => {
    return db.sequelize.drop({ logging: false, cascade: true }).then(() => {
      return db.sequelize.sync({ logging: false });
    });
  });

  describe('#createPackage', () => {
    it('respond with matching records', () => {
      const trackingNumber = 'abc';
      const carrier = 'Lockheed F-117 Nighthawk';
      return Package.createPackage(trackingNumber, carrier).then(pack => {
        console.log(pack);
        expect(pack).to.equal(null);
      });
    });
  });
});
