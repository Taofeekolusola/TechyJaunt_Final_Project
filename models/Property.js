const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Property = sequelize.define("Properties", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  landlordId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "Users", key: "id" },
  },
});

// Define associations
Property.associate = (models) => {
  Property.belongsTo(models.User, { foreignKey: "landlordId", as: "Users" });
};

module.exports = { Property };