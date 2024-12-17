const { Sequelize } = require("sequelize");
const sequelize = require("../db");

// Import models
const { User } = require("./User"); // Destructure User from the exported object
const { Property } = require("./Property"); // Destructure Property
const { Payment } = require("./Payment"); // Destructure Payment

// Define associations
User.hasMany(Property, { foreignKey: "landlordId", as: "properties" });
Property.belongsTo(User, { foreignKey: "landlordId", as: "landlord" });

User.hasMany(Payment, { foreignKey: "tenantId", as: "payments" });
Payment.belongsTo(User, { foreignKey: "tenantId", as: "tenant" });

Property.hasMany(Payment, { foreignKey: "propertyId", as: "payments" });
Payment.belongsTo(Property, { foreignKey: "propertyId", as: "property" });

// Export models and sequelize
module.exports = {
  sequelize,
  User,
  Property,
  Payment,
};