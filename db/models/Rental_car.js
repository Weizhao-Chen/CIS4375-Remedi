const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rental_Car', {
    rentalCarID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rentalCarModel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalCarMake: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentalLicense: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Rental_Car',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  });
};
