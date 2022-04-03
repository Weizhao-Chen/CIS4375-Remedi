module.exports = {
  associate: models => {
    models.login.belongsTo(models.accountType)

    models.Module.belongsTo(models.EMR, {foreignKey: "emrID"});
    models.EMR.hasMany(models.Module, {foreignKey: "moduleID"});

    models.Contractor.belongsTo(models.Contractor_Status, {foreignKey: "contractorStatusID"});
    models.Contractor_Status.hasMany(models.Contractor, {foreignKey: "contractorID"});


  }
}
