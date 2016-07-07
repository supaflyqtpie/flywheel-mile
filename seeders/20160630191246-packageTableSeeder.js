module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('package', [
        { userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          trackingNumber: '9405510200793025276722',
          carrier: 'usps',
        },
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('package', null, {});
  },
};
