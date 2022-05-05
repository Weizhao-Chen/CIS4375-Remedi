const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Module', {
    moduleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    emrID: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Module__8EEC8E371EC1E27E",
        unique: true,
        fields: [
          { name: "moduleID" },
        ]
      },
      {
        name: "PK__Module__8EEC8E37F47629D9",
        unique: true,
        fields: [
          { name: "moduleID" },
        ]
      },
    ]
  });
};
