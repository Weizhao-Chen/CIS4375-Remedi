const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contractor_Project', {
    contractorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Contractor_Project',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false
    // indexes: [
    //   {
    //     name: "PK__Contract__FF57E0CD5D3B895B",
    //     unique: true,
    //     fields: [
    //       { name: "contractorID" },
    //       { name: "projectID" },
    //     ]
    //   },
    //   {
    //     name: "PK__Contract__FF57E0CD6F0567AD",
    //     unique: true,
    //     fields: [
    //       { name: "contractorID" },
    //       { name: "projectID" },
    //     ]
    //   },
    //   {
    //     name: "PK__Contract__FF57E0CDF6ED3BF8",
    //     unique: true,
    //     fields: [
    //       { name: "contractorID" },
    //       { name: "projectID" },
    //     ]
    //   },
    // ]
  });
};
