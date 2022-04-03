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
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Houston"
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Texas"
    },
    zipCode: {
      type: DataTypes.CHAR,
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
    remediHistory: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    supportWisdom: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    numberOfGoLives: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    numberofEpicProjects: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    yearsOfSupportEpic: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    supportVirtualEpic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    creditCardHotel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    contractorStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Contractor_Status',
        key: 'contractorStatusID'
      }
    }
  }, {
    sequelize,
    tableName: 'Contractor',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Contract__BE48F41509B717E2",
        unique: true,
        fields: [
          { name: "contractorID" },
        ]
      },
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
