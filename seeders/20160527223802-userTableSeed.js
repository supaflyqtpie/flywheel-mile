module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [
        // id must be unique in db
        { createdAt: new Date(),
          updatedAt: new Date(),
          email: 'test@gmail.com',
          password: 'test' },
    ]);
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  },
};
