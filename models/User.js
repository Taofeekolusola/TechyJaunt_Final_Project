const { DataTypes } = require('sequelize');
const sequelize = require('../db');

  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
      firstname: {
          type: DataTypes.STRING,
          allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
    },
      password: {
          type: DataTypes.STRING,
          allowNull: false
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
      role: {
          type: DataTypes.ENUM("tenant", "landlord"),
          allowNull: false
    },
  });
  module.exports = { User };