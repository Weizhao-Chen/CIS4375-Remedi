const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contractor', {
    contractorID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    virtualOnsite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preferredName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressLineOne: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressLineTwo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    onboarded: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    remediHistory: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    supportWisdom: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    numberOfGoLives: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numberofEpicProjects: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    yearsOfSupportEpic: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    supportVirtualEpic: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    creditCardHotel: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Contractor',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Contract__BE48F4155DE2FD63",
        unique: true,
        fields: [
          { name: "contractorID" },
        ]
      },
    ]
  });
};
