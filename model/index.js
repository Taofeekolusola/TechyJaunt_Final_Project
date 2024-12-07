const { Sequelize } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Property = require('./property');

// Set up associations
User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Property,
};
