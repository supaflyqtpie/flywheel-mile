import { expect } from 'chai';
import db from '../../models/index';
const Package = db.Package;

describe('Package', () => {
  describe('#createPackage', () => {
    it('respond with matching records', () => {
      const trackingNumber = 'abc';
      const carrier = 'Lockheed F-117 Nighthawk';
      const item = Package.createPackage(1, trackingNumber, carrier);
    });
  });
});
