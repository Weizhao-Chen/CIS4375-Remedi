const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Flight', {
    flightID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    flightCompany: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flightDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    departLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialApprovalGranted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    specialApprovalName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    specialApprovalDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    flightCost: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Flight',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Flight__0E018622296B1C39",
        unique: true,
        fields: [
          { name: "flightID" },
        ]
      },
    ]
  });
};
