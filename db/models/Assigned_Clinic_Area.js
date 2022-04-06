const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Assigned_Clinic_Area', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    clinicID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
      unique: true
    }
  }, {
    sequelize,
    tableName: 'Assigned_Clinic_Area',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false
    // indexes: [
    //   {
    //     name: "PK__Assigned__2124AC3C002B4F13",
    //     unique: true,
    //     fields: [
    //       { name: "contractorID" },
    //       { name: "clinicID" },
    //     ]
    //   },
    //   {
    //     name: "PK__Assigned__2124AC3C557AEF24",
    //     unique: true,
    //     fields: [
    //       { name: "contractorID" },
    //       { name: "clinicID" },
    //     ]
    //   },
    //   {
    //     name: "PK__Assigned__2124AC3C823896E5",
    //     unique: true,
    //     fields: [
    //       { name: "contractorID" },
    //       { name: "clinicID" },
    //     ]
    //   },
    // ]
  });
};
