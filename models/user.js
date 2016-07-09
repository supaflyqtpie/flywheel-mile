const bcrypt = require('bcrypt');

module.exports = function defineUserModel(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, User.saltRounds); // eslint-disable-line no-param-reassign
      },
    },
  });

  User.saltRounds = 10;

  User.createUser = (email, password) =>
    User.create({
      email,
      password,
    });

  User.comparePassword = (password, hash) => new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
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
