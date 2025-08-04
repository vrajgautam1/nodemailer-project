"use strict";

const Sequelize = require("sequelize");
const sequelize = require("./db");

// Import models (non-factory)
const Users = require("./users");
const Address = require("./address");

// Setup associations manually
Users.hasOne(Address, { foreignKey: "userId", onDelete: "CASCADE" });
Address.belongsTo(Users, { foreignKey: "userId" });

// Export all models
module.exports = {
  sequelize,
  Sequelize,
  Users,
  Address,
};
