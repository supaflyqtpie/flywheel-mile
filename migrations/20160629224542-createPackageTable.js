module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Package', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
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
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Package');
  },
};
