const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Project_Status', {
    projectStatusID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    projectStatusType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Project_Status',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Project___A0FCF07CEA669B20",
        unique: true,
        fields: [
          { name: "projectStatusID" },
        ]
      },
    ]
  });
};
