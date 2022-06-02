const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contractor_Hotel', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hotelID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Hotel',
        key: 'hotelID'
      }
    }
  }, {
    sequelize,
    tableName: 'Contractor_Hotel',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK__Contract__8F32285C3869F4F0",
        unique: true,
        fields: [
          { name: "contractorID" },
          { name: "hotelID" },
        ]
      },
    ]
  });
};
