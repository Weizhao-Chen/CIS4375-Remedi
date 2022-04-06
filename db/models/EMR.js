const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EMR', {
    emrID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    emrName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'EMR',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__EMR__A319B07F33943F27",
        unique: true,
        fields: [
          { name: "emrID" },
        ]
      },
      {
        name: "PK__EMR__A319B07F852F27CF",
        unique: true,
        fields: [
          { name: "emrID" },
        ]
      },
    ]
  });
};
