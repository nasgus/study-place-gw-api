'use strict';

const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    middleName: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },

  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };

  User.hashPassword = function (password) {
    return crypto.createHash('md5').update(password).digest('hex')
  };

  return User;
};