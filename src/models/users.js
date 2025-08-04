const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "inactive",
  },
  gender: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
}, {
  timestamps: true,
});

module.exports = Users;
