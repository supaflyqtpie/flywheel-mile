module.exports = function defineUserModel(sequelize, DataTypes) {
  const PackageHistory = sequelize.define('PackageHistory', {
    statusDate: DataTypes.DATE,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
    status: DataTypes.STRING,
    statusDetail: DataTypes.STRING,
  });

  PackageHistory.findByPackageId = function findByPackageId(packageId) {
    return PackageHistory.findAll({
      where: {
        packageId,
      },
    });
  };

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
    PackageHistory.belongsTo(db.Package, {
      as: 'package',
    });
  };
  return PackageHistory;
};
