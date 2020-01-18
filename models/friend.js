'use strict';

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    friendOne: {
      type: DataTypes.UUID,
      required: true,
    },
    friendTwo: {
      type: DataTypes.UUID,
      required: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      required: true
    }
  }, {});

  Friend.associate = function (models) {
    // Friend.hasMany(models.User, {foreignKey: 'friendOne'});
    // Friend.hasMany(models.User, {foreignKey: 'friendTwo'});
  };

  return Friend;
};