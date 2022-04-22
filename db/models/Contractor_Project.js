const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contractor_Project', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Contractor',
        key: 'contractorID'
      }
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Project',
        key: 'projectID'
      }
    }
  }, {
    sequelize,
    tableName: 'Contractor_Project',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Contract__FF57E0CD868167AF",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "projectID" },
        ]
      },
    ]
  });
};
