const sequelize = require("../db");
const { Property } = require("./Property");
const { Landlord } = require("./Landlord");

// Initialize associations
Property.associate({ Landlord });
Landlord.associate({ Property });

module.exports = {
  sequelize,
  Property,
  Landlord,
};
