const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Clinic_Area', {
    clinicID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    clinicAreaName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hospitalID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Hospital',
        key: 'hospitalID'
      }
    }
  }, {
    sequelize,
    tableName: 'Clinic_Area',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Clinic_A__F6C58298538C2659",
        unique: true,
        fields: [
          { name: "clinicID" },
        ]
      },
    ]
  });
};
