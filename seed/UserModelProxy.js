var models = require("../projects/models");

var exports = module.exports = {};

exports.insertUser = function(email, password) {
    return models.User.create({
        email: email,
        password: password
    });
};

exports.containsUser = function(email) {
    return models.User.findOne({
        where: {
            email: email
        }
    });
};

exports.findOrCreate = function(email, password) {
    models.User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            email: email,
            password: password
        }
    }).spread(function(user, created) {
        if (!created) {
            // TODO: logic for already existing user
            console.log("User already exists!");
        } else {
            console.log("Created User");
            console.log(user.dataValues);
        }
    });
};
