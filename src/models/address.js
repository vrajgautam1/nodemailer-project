module.exports = (sequelize, datatypes) => {
  const Address = sequelize.define("Address", {
    id: {
      type: datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: datatypes.INTEGER,
      references: {
        model: "users",  
        key: "id"
      }
    },
    street: {
      type: datatypes.STRING
    },
    district: {
      type: datatypes.STRING
    },
    state: {
      type: datatypes.STRING
    },
    pincode: {
      type: datatypes.STRING
    },
    country: {
      type: datatypes.STRING
    }
  },{
    timestamps: true
  });

  Address.associate = (models) => {
    Address.belongsTo(models.Users, {
      foreignKey: "userId"
    });
  };

  return Address;
};
