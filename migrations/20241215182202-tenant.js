'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tenant', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      DOB: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      employmentStatus: {
        type: Sequelize.ENUM('Employment', 'Unemployment', 'other'),
        allowNull: false,
      },
      maritalStatus: {
        type: Sequelize.ENUM('Single', 'Married', 'Divorced', 'Widowed'),
        allowNull: false,
      },
      income: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        userId: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tenant');
  }
};