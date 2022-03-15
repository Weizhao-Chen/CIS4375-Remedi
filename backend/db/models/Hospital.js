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
      allowNull: false
    },
    hospitalState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hospitalZipCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hospitalContactName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hospitalContactInfo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Hospital',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
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
