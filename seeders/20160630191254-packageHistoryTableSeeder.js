module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('packageHistories', [
      {
        packageId: 1,
        statusDate: new Date(),
        city: 'Fremont',
        state: 'CA',
        zip: '94538',
        country: 'US',
        status: 'DELIVERED',
        statusDetail: 'Your shipment has been delivered at the destination mailbox.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('packageHistories', null, {});
  },
};
