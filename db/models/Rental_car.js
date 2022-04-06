const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rental_Car', {
    rentalCompanyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    tableName: 'Rental_Car',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
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
      {
        name: "PK__Rental_C__5616AAECD5C7402D",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "rentalCompanyID" },
        ]
      },
    ]
  });
};
