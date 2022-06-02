const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Assigned_Module', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    moduleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Assigned_Module',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Assigned__BE48F415D75689A5",
        unique: true,
        fields: [
          { name: "contractorID" },
        ]
      },
    ]
  });
};
