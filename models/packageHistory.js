module.exports = function defineUserModel(sequelize, DataTypes) {
  const PackageHistory = sequelize.define('packageHistory', {
    statusDate: DataTypes.DATE,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
    status: DataTypes.STRING,
    statusDetail: DataTypes.STRING,
  });

  PackageHistory.createPackageHistory = function createPackageHistory(
    packageId,
    statusDate,
    city,
    state,
    zip,
    country,
    status,
    statusDetail) {
    return PackageHistory.create({
      packageId,
      statusDate,
      city,
      state,
      zip,
      country,
      status,
      statusDetail,
    });
  };

  PackageHistory.associate = function associate(db) {
    PackageHistory.belongsTo(db.package);
  };

  return PackageHistory;
};
