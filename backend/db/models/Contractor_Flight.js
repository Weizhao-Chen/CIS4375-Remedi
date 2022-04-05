const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contractor_Flight', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    flightID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contractorFlyerNumber: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Contractor_Flight',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
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
      {
        name: "PK__Contract__8EA8EC777C2B7223",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "flightID" },
        ]
      },
      {
        name: "PK__Contract__8EA8EC777E00C24B",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "flightID" },
        ]
      },
    ]
  });
};
