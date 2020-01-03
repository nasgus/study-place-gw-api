'use strict';

const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    profileId: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {});

  User.associate = function (models) {
    User.hasOne(models.Profile, {as: 'profile', foreignKey: 'userId'})
  };

  User.hashPassword = function (password) {
    return crypto.createHash('md5').update(password).digest('hex')
  };

  return User;
};