'use strict';

const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    profileId: {
      type: DataTypes.UUID
    }
  }, {});

  User.associate = function (models) {
    User.belongsTo(models.Profile)
  };

  User.hashPassword = function (password) {
    return crypto.createHash('md5').update(password).digest('hex')
  };

  return User;
};