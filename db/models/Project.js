const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Project', {
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      allowNull: false
    },
    projectStatusID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Project',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  });
};
