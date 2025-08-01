module.exports = (sequelize, datatypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: datatypes.STRING,
        allowNull: false,
      },
      username: {
        type: datatypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: datatypes.STRING,
        allowNull: false,
        unique: true,
      },
      companyName: {
        type: datatypes.STRING,
        allowNull: false,
      },
      accStatus: {
        type: datatypes.STRING,
        allowNull: true,
        defaultValue: "inactive",
      },
      gender: {
        type: datatypes.STRING,
      },
      password: {
        type: datatypes.STRING,
        allowNull: true
      },
      role: {
        type: datatypes.STRING,
        defaultValue: "user",
      },
    },
    {
      timestamps: true,
    }
  );

  Users.associate = (models)=>{
    Users.hasOne(models.Address, {
        foreignKey: "userId",
        onDelete: "CASCADE"
    })
  }
  return Users
};
