module.exports = function defineUserModel(sequelize, DataTypes) {
  const Package = sequelize.define('package', {
    trackingNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
    carrier: { type: DataTypes.STRING, allowNull: false },
    originCity: { type: DataTypes.STRING, allowNull: false },
    originState: { type: DataTypes.STRING },
    originCountry: { type: DataTypes.STRING, allowNull: false },
    destinationCity: { type: DataTypes.STRING, allowNull: false },
    destinationState: { type: DataTypes.STRING },
    destinationCountry: { type: DataTypes.STRING, allowNull: false },
  });

  Package.createPackage = function createPackage(trackingNumber, carrier, origin, destination) {
    return Package.create({
      trackingNumber,
      carrier,
      originCity: origin.city,
      originState: origin.state,
      originCountry: origin.country,
      destinationCity: destination.city,
      destinationState: destination.state,
      destinationCountry: destination.country,
    });
  };

  Package.associate = function associate(db) {
    Package.belongsTo(db.user);
    Package.hasMany(db.packageHistory);
  };

  return Package;
};
