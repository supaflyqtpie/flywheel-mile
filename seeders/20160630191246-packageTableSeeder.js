module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Packages', [
        { createdAt: new Date(),
          updatedAt: new Date(),
          email: 'test@gmail.com',
          trackingNumber: '9405510200793025276722',
          carrier: 'usps',
        },
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Packages', null, {});
  },
};
