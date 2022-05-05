const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Preferred_Module', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    moduleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
        name: "PK__Preferre__D6A63CF62C3CDEF7",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "moduleID" },
        ]
      },
      {
        name: "PK__Preferre__D6A63CF6678AB998",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "moduleID" },
        ]
      },
      {
        name: "PK__Preferre__D6A63CF67977159C",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "moduleID" },
        ]
      },
    ]
  });
};
