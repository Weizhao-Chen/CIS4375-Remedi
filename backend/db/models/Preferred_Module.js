const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Preferred_Module', {
    preferredModuleID: {
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
    }
  }, {
    sequelize,
    tableName: 'Preferred_Module',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Preferre__61DADE1D7B81BB5D",
        unique: true,
        fields: [
          { name: "preferredModuleID" },
        ]
      },
    ]
  });
};
