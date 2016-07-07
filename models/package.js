module.exports = function defineUserModel(sequelize, DataTypes) {
  const Package = sequelize.define('package', {
    trackingNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
    carrier: { type: DataTypes.STRING, allowNull: false },
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
