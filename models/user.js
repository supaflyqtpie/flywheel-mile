module.exports = function defineUserModel(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  User.createUser = (email, password) =>
    User.create({
      email,
      password,
    });

  User.findByEmail = (email) =>
    User.findOne({
      where: {
        email,
      },
    });

  User.associate = (db) => {
    User.hasMany(db.package);
  };

  return User;
};
