import { expect } from 'chai';
import db from '../../models/index';
import { setupDB } from '../utils';
const Package = db.package;
const User = db.user;

const email = 'dory@blue.fish';
const password = 'findingbluefish';

describe('UserModel', () => {
  beforeEach(setupDB);

  describe('#User Functions', () => {
    it('be able to create a user', () =>
      User.createUser(email, password)
      .then(item => {
        expect(item.email).to.equal(email);
        expect(item.password).to.equal(password);
      })
    );

    it('be able to find by email', () =>
      User.create({ email, password })
      .then(item => User.findByEmail(email)
      .then((user) => {
        expect(item.email).to.equal(user.email);
        expect(item.password).to.equal(user.password);
      }))
    );
  });
});
