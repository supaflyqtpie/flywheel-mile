module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [
        // id must be unique in db
        { createdAt: new Date(),
          updatedAt: new Date(),
          email: 'test@gmail.com',
          password: 'test' },
    ]);
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
  },
};
