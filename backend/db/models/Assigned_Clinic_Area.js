const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Assigned_Clinic_Area', {
    assignedClinicAreaID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clinicID: {
      type: DataTypes.INTEGER,
      allowNull: false
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
        name: "PK__Assigned__D447B5704CC58FD5",
        unique: true,
        fields: [
          { name: "assignedClinicAreaID" },
        ]
      },
    ]
  });
};
