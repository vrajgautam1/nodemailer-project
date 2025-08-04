const { DataTypes } = require("sequelize");
const sequelize = require("./db"); // ✅ get it directly

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // Make sure the Users model name matches here
        key: "id",
      },
    },
    street: { type: DataTypes.STRING },
    district: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    pincode: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);

module.exports = Address;
