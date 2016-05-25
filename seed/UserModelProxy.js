const models = require('../models');

const exports = module.exports = {};

exports.insertUser = function insertUser(email, password) {
  return models.User.create({
    email,
    password,
  });
};

exports.containsUser = function containsUser(email) {
  return models.User.findOne({
    where: {
      email,
    },
  });
};

exports.findOrCreate = function findOrCreate(email, password) {
  models.User.findOrCreate({
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
