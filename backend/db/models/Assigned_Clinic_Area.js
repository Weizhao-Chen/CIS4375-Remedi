const Sequelize = require('sequelize');
const _Contractor = require("./Contractor");
const _Clinic_Area = require("./Clinic_Area");
module.exports = function(sequelize, DataTypes) {

  const Contractors = _Contractor(sequelize, DataTypes);
  const Clinic_Areas = _Clinic_Area(sequelize, DataTypes);

  return sequelize.define('Assigned_Clinic_Area', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Contractors
        // key: 'contractorID'
      }
    },
    clinicID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // primaryKey: true,
      references: {
        model: Clinic_Areas
        // key: 'clinicID'
      }
    }
  }, {
    sequelize,
    tableName: 'Assigned_Clinic_Area',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Assigned__2124AC3C002B4F13",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "clinicID" },
        ]
      },
      {
        name: "PK__Assigned__2124AC3C823896E5",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "clinicID" },
        ]
      },
    ]
  });
};
