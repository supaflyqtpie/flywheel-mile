module.exports = function defineUserModel(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.createUser = function createUser(email, password) {
    return User.create({
      email,
      password,
    });
  };

  User.findByEmail = function findByEmail(email) {
    return User.findOne({
      where: {
        email,
      },
    });
  };

  return User;
};
