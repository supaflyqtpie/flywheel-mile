const bcrypt = require('bcrypt');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/bcryptConfig.json')[env];

function hashPassword(password) {
  return bcrypt.hashSync(password, config.salt_rounds);
}

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        email: 'test@gmail.com',
        password: hashPassword('test'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
