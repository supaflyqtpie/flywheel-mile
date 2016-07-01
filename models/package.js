module.exports = function defineUserModel(sequelize, DataTypes) {
  const Package = sequelize.define('Package', {
    email: DataTypes.STRING,
    trackingNumber: DataTypes.STRING,
    carrier: DataTypes.STRING,
  });

  Package.createPackage = function createPackage(email, trackingNumber, carrier) {
    return Package.create({
      email,
      trackingNumber,
      carrier,
    });
  };

  Package.findByEmail = function findByEmail(email) {
    return Package.findOne({
      where: {
        email,
      },
    });
  };

  Package.findByTrackingNumber = function findByTrackingNumber(trackingNumber) {
    return Package.findOne({
      where: {
        trackingNumber,
      },
    });
  };

  return Package;
};
