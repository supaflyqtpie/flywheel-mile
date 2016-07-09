module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('packages', [
      {
        userId: 1,
        trackingNumber: '9405510200793025276722',
        carrier: 'usps',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('packages', null, {});
  },
};
