module.exports = function defineUserModel(sequelize, DataTypes) {
  const Package = sequelize.define('package', {
    trackingNumber: DataTypes.STRING,
    carrier: DataTypes.STRING,
  });

  Package.createPackage = function createPackage(trackingNumber, carrier) {
    return Package.create({
      trackingNumber,
      carrier,
    });
  };

  Package.associate = function associate(db) {
    Package.belongsTo(db.user);
    Package.hasMany(db.packageHistory);
  };

  return Package;
};
