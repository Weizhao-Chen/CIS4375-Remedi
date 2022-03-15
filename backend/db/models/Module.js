const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Module', {
    moduleID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    emrID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EMR',
        key: 'emrID'
      }
    },
    moduleName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Module',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Module__8EEC8E371EC1E27E",
        unique: true,
        fields: [
          { name: "moduleID" },
        ]
      },
    ]
  });
};
