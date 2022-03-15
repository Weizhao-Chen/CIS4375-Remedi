const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Assigned_Clinic_Area', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Contractor',
        key: 'contractorID'
      }
    },
    clinicID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Clinic_Area',
        key: 'clinicID'
      }
    }
  }, {
    sequelize,
    tableName: 'Assigned_Clinic_Area',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
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
    ]
  });
};
