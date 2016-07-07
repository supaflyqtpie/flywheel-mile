module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('package', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      trackingNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      carrier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('package');
  },
};
