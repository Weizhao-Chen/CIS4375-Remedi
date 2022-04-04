const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contractor_Flight', {
    contractorFlightID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    flightID: {
      type: DataTypes.INTEGER,
      allowNull: false
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
        name: "PK__Contract__0E84A6C65C0BA337",
        unique: true,
        fields: [
          { name: "contractorFlightID" },
        ]
      },
    ]
  });
};
