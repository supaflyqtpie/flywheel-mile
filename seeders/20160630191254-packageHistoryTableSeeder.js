module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PackageHistory', [
        { packageId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          statusDate: new Date(Date.parse('2016-06-28T21:40:24.238Z')),
          city: 'Fremont',
          state: 'CA',
          zip: '94538',
          country: 'US',
          status: 'DELIVERED',
          statusDetail: 'Your shipment has been delivered at the destination mailbox.',
        },
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PackageHistory', null, {});
  },
};
