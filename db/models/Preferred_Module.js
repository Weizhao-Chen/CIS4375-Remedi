const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Preferred_Module', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Contractor',
        key: 'contractorID'
      }
    },
    moduleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Module',
        key: 'moduleID'
      }
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
        name: "PK__Preferre__D6A63CF6D3F35751",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "moduleID" },
        ]
      },
    ]
  });
};
