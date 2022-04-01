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
      allowNull: true
    },
    airlineCity: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Houston"
    },
    airlineState: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Texas"
    },
    airlineCountry: {
      type: DataTypes.STRING,
      allowNull: false
    },
    airlineZipCode: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    airlineWebsite: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Airline',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Airline__D04734A96C640C6B",
        unique: true,
        fields: [
          { name: "airlineID" },
        ]
      },
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
