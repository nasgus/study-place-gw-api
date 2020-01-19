'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lessons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uniqueLessonId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      outgoingUser: {
        type: Sequelize.UUID,
        required: true
      },
      incomingUser: {
        type: Sequelize.UUID,
        required: true
      },
      notebook: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Lessons');
  }
};