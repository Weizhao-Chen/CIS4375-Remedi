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
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Contract__FF57E0CD5D3B895B",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "projectID" },
        ]
      },
      {
        name: "PK__Contract__FF57E0CD6F0567AD",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "projectID" },
        ]
      },
    ]
  });
};
