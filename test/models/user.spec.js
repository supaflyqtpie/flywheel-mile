import { expect } from 'chai';
import db from '../../models/index';
import { setupDB } from '../utils';
const Package = db.package;
const User = db.user;

const email = 'dory@blue.fish';
const password = 'findingbluefish';

describe('User Model', () => {
  beforeEach(setupDB);

  describe('User Functions', () => {
    describe('createUser', () => {
      it('should be able to create a user', () =>
        User.createUser(email, password)
        .then(item => {
          expect(item.email).to.equal(email);
          expect(item.password).to.not.equal(password);
        })
      );
    });

    describe('findByEmail', () => {
      it('should be able to find a user by email', () =>
        User.create({ email, password })
        .then(item => User.findByEmail(email)
        .then(user => {
          expect(item.email).to.equal(user.email);
          expect(item.password).to.equal(user.password);
        }))
      );
    });

    describe('comparePassword', () => {
      it('should be able to find a user by email', () =>
        User.create({ email, password })
        .then(item => User.findByEmail(email)
        .then(user => {
          User.comparePassword(password, user.password).then(success => expect(success).to.be.true);
        }))
      );
    });
  });

  describe('has many packages', () => {
    it('should return a user\'s packages', () =>
      User.create({
        email,
        password,
        packages: [
          { trackingNumber: 'S0mEFunkie#', carrier: 'usps' },
          { trackingNumber: '1800dankmemes', carrier: 'fedex' },
        ],
      }, {
        include: [Package],
      }).then(user => user.getPackages().then(packages => {
        expect(packages.length).to.be.equal(2);
      }))
    );
  });
});
