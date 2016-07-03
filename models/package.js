module.exports = function defineUserModel(sequelize, DataTypes) {
  const Package = sequelize.define('Package', {
    email: DataTypes.STRING,
    trackingNumber: DataTypes.STRING,
    carrier: DataTypes.STRING,
  });

  Package.createPackage = function createPackage(userId, trackingNumber, carrier) {
    return Package.create({
      userId,
      trackingNumber,
      carrier,
    });
  };

  Package.findByUserId = function findByUserId(userId) {
    return Package.findOne({
      where: {
        userId,
      },
    });
  };

  Package.findByUserIdTrackingNumber = function findByUserIdTrackingNumber(userId, trackingNumber) {
    return Package.findOne({
      where: {
        userId,
        trackingNumber,
      },
    });
  };

  Package.associate = function associate(db) {
    Package.belongsTo(db.User, {
      as: 'user',
    });
  };

  return Package;
};
