const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Airline', {
    airlineID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    airlineName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airlinePhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airlineAddressLineOne: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airlineAddressLineTwo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airlineCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airlineState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airlineZipCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Airline',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Airline__D04734A9F7E79408",
        unique: true,
        fields: [
          { name: "airlineID" },
        ]
      },
    ]
  });
};
