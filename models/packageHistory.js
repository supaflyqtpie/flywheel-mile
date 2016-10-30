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

  const transformShippoResponseToDb = function transformShippoResponseToDb(packageId, response) {
    return new Promise((resolve, reject) => {
      resolve(response.trackingHistory.map((value) => {
        return {
          packageId,
          statusDate: value.statusDate,
          city: value.city,
          state: value.state,
          zip: value.zip,
          country: value.country,
          status: value.status,
          statusDetail: value.statusDetail,
        };
      }));
    });
  };

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

  PackageHistory.createFromShippoResponse = function createFromShippoResponse(packageId, res) {
    return transformShippoResponseToDb(packageId, res).then((history) => {
      return PackageHistory.bulkCreate(history, { ignoreDuplicates: true });
    });
  };

  PackageHistory.getOrdered = (packageId) => {
    return PackageHistory.findAll({
      where: { packageId },
      order: '"statusDate" DESC',
    });
  };

  PackageHistory.associate = function associate(db) {
    PackageHistory.belongsTo(db.package);
  };

  return PackageHistory;
};
