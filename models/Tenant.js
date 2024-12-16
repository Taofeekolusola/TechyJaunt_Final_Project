const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Tenant = sequelize.define("Tenant", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: false,
  },
  DOB: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  employmentStatus: {
    type: DataTypes.ENUM("Employment", "Unemployment", "other"),
    allowNull: false,
  },
  maritalStatus: {
    type: DataTypes.ENUM("Single", "Married", "Divorced", "Widowed"),
    allowNull: false,
  },
  income: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
});

// Associations are defined in a separate step to avoid circular imports
Tenant.associate = (models) => {
  models.User.hasOne(Tenant, { foreignKey: "userId", as: "tenantDetails" });
  Tenant.belongsTo(models.User, { foreignKey: "userId" });
};

module.exports = { Tenant };