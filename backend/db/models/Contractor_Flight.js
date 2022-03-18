const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contractor_Flight', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Contractor',
        key: 'contractorID'
      }
    },
    flightID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Flight',
        key: 'flightID'
      }
    }
  }, {
    sequelize,
    tableName: 'Contractor_Flight',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Contract__8EA8EC77321EBF7C",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "flightID" },
        ]
      },
    ]
  });
};
