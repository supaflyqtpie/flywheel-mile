const bcrypt = require('bcrypt');

const saltRounds = 10;
module.exports = function defineUserModel(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  User.createUser = (email, password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) { reject(err); }
      resolve(User.create({ email, password: hash }));
    });
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
