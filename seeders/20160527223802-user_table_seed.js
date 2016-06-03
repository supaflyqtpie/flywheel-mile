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
    return queryInterface.bulkInsert('Users', [
        // id must be unique in db
        { id: 1, createdAt: new Date(), updatedAt: new Date(), email: 'test@gmail.com', password: 'test' }
    ]);
  },
  down: function (queryInterface, Sequelize) {

  }
};
