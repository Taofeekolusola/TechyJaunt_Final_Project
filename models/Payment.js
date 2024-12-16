const { DataTypes } = require('sequelize');
const sequelize = require('../db');

    const Payment = sequelize.define("Payments", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Properties", key: "id" },
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
      Payment.belongsTo(models.User, { foreignKey: "tenantId", as: "tenants" });
      Payment.belongsTo(models.Property, { foreignKey: "propertyId", as: "properties" });
    };
  
    module.exports = { Payment };