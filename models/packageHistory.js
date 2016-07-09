module.exports = function defineUserModel(sequelize, DataTypes) {
  const PackageHistory = sequelize.define('packageHistory', {
    statusDate: { type: DataTypes.DATE, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    zip: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    statusDetail: { type: DataTypes.STRING, allowNull: false },
  }, {
    name: {
      singular: 'packageHistory',
      plural: 'packageHistories',
    },
  });

  PackageHistory.createPackageHistory = function createPackageHistory(
    statusDate,
    city,
    state,
    zip,
    country,
    status,
    statusDetail) {
    return PackageHistory.create({
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
