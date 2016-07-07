module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        email: 'test@gmail.com',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
