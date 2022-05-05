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
      allowNull: false,
      primaryKey: true
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
        name: "PK__Assigned__52B7CDBB1C8A9B71",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "moduleID" },
          { name: "projectID" },
        ]
      },
    ]
  });
};
