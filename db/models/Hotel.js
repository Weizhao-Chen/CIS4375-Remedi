const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hotel', {
    hotelID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hotelname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hotelcheckindate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hotelcheckintime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    hotelcheckoutdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hotelcheckouttime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Hotel',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    indexes: [
      {
        name: "PK_Hotel",
        unique: true,
        fields: [
          { name: "hotelID" },
        ]
      },
    ]
  });
};
