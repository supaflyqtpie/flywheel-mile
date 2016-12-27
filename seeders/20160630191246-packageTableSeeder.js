module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('packages', [
      {
        userId: 1,
        trackingNumber: '9405510200793025276722',
        carrier: 'usps',
        originCity: 'Fremont',
        originState: 'CA',
        originCountry: 'US',
        destinationCity: 'Portland',
        destinationState: 'OR',
        destinationCountry: 'US',
        eta: new Date(),
        serviceLevel: 'beast',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        trackingNumber: '602922005857',
        carrier: 'fedex',
        originCity: 'Fremont',
        originState: 'CA',
        originCountry: 'US',
        destinationCity: 'Portland',
        destinationState: 'OR',
        destinationCountry: 'US',
        eta: new Date(),
        serviceLevel: 'beast',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('packages', null, {});
  },
};
