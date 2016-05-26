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

  User.findOrCreate = function findOrCreate(email, password) {
    User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
        password,
      },
    }).spread((user, created) => {
      if (!created) {
        // TODO: logic for already existing user
        console.log('User already exists!');
      } else {
        console.log('Created User');
        console.log(user.dataValues);
      }
    });
  };

  return User;
};
