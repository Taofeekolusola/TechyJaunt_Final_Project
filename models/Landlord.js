const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Landlord = sequelize.define("Landlord", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "User",
      key: "id"
    },
  },
  propertyId: {
    type: DataTypes.UUID,
    references: {
      model: "Property",
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
});

// Define associations
Landlord.associate = (models) => {
  Landlord.hasMany(models.Property, { foreignKey: "propertyId", as: "properties" });
  Landlord.hasMany(models.User, { foreignKey: "userId", as: "user" });
};
module.exports = { Landlord };