const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Assigned_Module', {
    assignedModuleID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    moduleID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: false
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
        name: "PK__Assigned__AA25194AD6750276",
        unique: true,
        fields: [
          { name: "assignedModuleID" },
        ]
      },
    ]
  });
};
