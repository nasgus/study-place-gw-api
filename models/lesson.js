'use strict';

const crypto = require('crypto');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    uniqueLessonId: {
      type: DataTypes.STRING,
      required: true
    },
    outgoingUser: {
      type: DataTypes.UUID,
      required: true
    },
    incomingUser: {
      type: DataTypes.UUID,
      required: true
    },
    notebook: {
      type: DataTypes.STRING
    }
  }, {});

  Lesson.associate = function (models) {

  };

  Lesson.createUniqueLessonId = function () {
    return uuid.v1()
  };

  return Lesson;
};