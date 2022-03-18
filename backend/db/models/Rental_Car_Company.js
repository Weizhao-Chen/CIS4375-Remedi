const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rental_Car_Company', {
    rentalCompanyID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rentalCompanyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalAddressLineOne: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalAddressLineTwo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalZipCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Rental_Car_Company',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Rental_C__85E5EF9FC4ECBF0E",
        unique: true,
        fields: [
          { name: "rentalCompanyID" },
        ]
      },
    ]
  });
};
