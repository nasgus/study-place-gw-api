'use strict';

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
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
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {});

  Profile.associate = function(models) {
    Profile.hasOne(models.User, {as: 'user'})
  };

  return Profile;
};