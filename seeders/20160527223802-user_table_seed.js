'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return [queryInterface.bulkInsert('User', [
        { email: 'test@gmail.com', password: 'test' },
        { email: 'raymondjiang2001@yahoo.com', password: 'test' },
        { email: 'alanlysuckslol@hotmail.com', password: 'test' }
    ])];
  }
};
