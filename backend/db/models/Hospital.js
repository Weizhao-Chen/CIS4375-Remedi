const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hospital', {
    hospitalID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hospitalName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hospitalAddressLineOne: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hospitalAddressLineTwo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hospitalCity: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Houston"
    },
    hospitalState: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Texas"
    },
    hospitalZipCode: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    hospitalContactName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hospitalContactPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hospitalContactEmail: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Hospital',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Hospital__C7F8EC0523C7D765",
        unique: true,
        fields: [
          { name: "hospitalID" },
        ]
      },
      {
        name: "PK__Hospital__C7F8EC05708FAC10",
        unique: true,
        fields: [
          { name: "hospitalID" },
        ]
      },
    ]
  });
};
