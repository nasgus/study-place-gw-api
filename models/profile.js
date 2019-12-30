'use strict';

const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: {
      type: DataTypes.UUID
    },
    photo: {
      type: DataTypes.BLOB
    },
    phone: {
      type: DataTypes.STRING
    },
    education: {
      type: DataTypes.STRING
    },
    dateOfBirthday: {
      type: DataTypes.DATE
    },
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
    }
  }, {});

  Profile.associate = function(models) {
    Profile.belongsTo(models.User)
  };

  return Profile;
};