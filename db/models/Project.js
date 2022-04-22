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
    hospitalID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Hospital',
        key: 'hospitalID'
      }
    },
    projectStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Project_Status',
        key: 'projectStatusID'
      }
    }
  }, {
    sequelize,
    tableName: 'Project',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Project__11F14D856A12AFE1",
        unique: true,
        fields: [
          { name: "projectID" },
        ]
      },
    ]
  });
};
