module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      originCity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      originState: {
        type: Sequelize.STRING,
      },
      originCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destinationCity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destinationState: {
        type: Sequelize.STRING,
      },
      destinationCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eta: {
        type: Sequelize.DATE,
      },
      serviceLevel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('packages');
  },
};
