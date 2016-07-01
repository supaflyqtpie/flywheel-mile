module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Packages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      trackingNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      carrier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Packages');
  },
};
