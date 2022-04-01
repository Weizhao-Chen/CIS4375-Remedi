const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rental_car', {
    rentalCompanyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Rental_Car_Company',
        key: 'rentalCompanyID'
      }
    },
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Contractor',
        key: 'contractorID'
      }
    },
    driverPassenger: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalCarModel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalCarMake: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalLicense: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Rental_car',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Rental_c__5616AAEC84597E6D",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "rentalCompanyID" },
        ]
      },
      {
        name: "PK__Rental_c__5616AAECD54E4B01",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "rentalCompanyID" },
        ]
      },
    ]
  });
};
