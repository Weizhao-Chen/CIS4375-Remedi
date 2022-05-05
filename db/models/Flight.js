const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Flight', {
    flightID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    flightName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flightDate: {
      type: DataTypes.DATEONLY,
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
    flightCost: {
      type: DataTypes.DECIMAL(10,2),
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
        name: "PK__Flight__0E0186225222424C",
        unique: true,
        fields: [
          { name: "flightID" },
        ]
      },
      {
        name: "PK__Flight__0E0186229B8C3AAC",
        unique: true,
        fields: [
          { name: "flightID" },
        ]
      },
      {
        name: "PK__Flight__0E018622C8192629",
        unique: true,
        fields: [
          { name: "flightID" },
        ]
      },
    ]
  });
};
