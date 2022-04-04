const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rental_Car', {
    rentalCarID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rentalCompanyID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false
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
        name: "PK__Rental_C__AA2246611750ADD6",
        unique: true,
        fields: [
          { name: "rentalCarID" },
        ]
      },
    ]
  });
};
