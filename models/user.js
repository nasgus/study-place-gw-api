'use strict';

const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    identity: {
      type: DataTypes.STRING,
      required: true
    },
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
    User.hasOne(models.Profile, {as: 'profile', foreignKey: 'userId'});
    User.hasMany(models.Friend, {foreignKey: 'friendOne'});
    User.hasMany(models.Friend, {foreignKey: 'friendTwo'});
  };

  User.hashPassword = function (password) {
    return crypto.createHash('md5').update(password).digest('hex')
  };

  User.createIdentity = function () {
    return `f${(+new Date).toString(16)}`
  }

  return User;
};