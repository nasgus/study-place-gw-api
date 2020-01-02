'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      photo: {
        type: Sequelize.BLOB
      },
      phone: {
        type: Sequelize.STRING
      },
      education: {
        type: Sequelize.STRING
      },
      dateOfBirthday: {
        type: Sequelize.DATE
      },
      firstName: {
        type: Sequelize.STRING,
        required: true,
      },
      lastName: {
        type: Sequelize.STRING,
        required: true,
      },
      middleName: {
        type: Sequelize.STRING,
        required: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        required: true
      },
      description: {
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
    return queryInterface.dropTable('Profiles');
  }
};