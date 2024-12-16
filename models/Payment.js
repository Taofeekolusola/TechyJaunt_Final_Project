const { DataTypes } = require('sequelize');
const sequelize = require('../db');

    const Payment = sequelize.define("Payment", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "User", key: "id" },
      },
      propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Property", key: "id" },
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM("pending", "completed"),
        allowNull: false
      },
      commission: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
    });
  
    Payment.associate = (models) => {
      Payment.belongsTo(models.User, { foreignKey: "tenantId", as: "tenant" });
      Payment.belongsTo(models.Property, { foreignKey: "propertyId", as: "property" });
    };
  
    module.exports = { Payment };