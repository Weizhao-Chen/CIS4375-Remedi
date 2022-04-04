const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contractor_Project', {
    contractorProjectID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: false
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
        name: "PK__Contract__A5B44B881BF9912B",
        unique: true,
        fields: [
          { name: "contractorProjectID" },
        ]
      },
    ]
  });
};
