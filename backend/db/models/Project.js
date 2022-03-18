const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Project', {
    projectID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    projectEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    projectNotes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    projectComplete: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'Project',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT',
    deletedAt: false,
    indexes: [
      {
        name: "PK__Project__11F14D85E49F6657",
        unique: true,
        fields: [
          { name: "projectID" },
        ]
      },
    ]
  });
};
