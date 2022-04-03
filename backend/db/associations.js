module.exports = {
  associate: models => {
    //below is for future and testing purpose
    models.login.belongsTo(models.accountType)

    //this does the PK/FK connecting
    //top uses the one below
    models.Module.belongsTo(models.EMR, {foreignKey: "emrID"});
    models.EMR.hasMany(models.Module, {foreignKey: "moduleID"});

    models.Contractor.belongsTo(models.Contractor_Status, {foreignKey: "contractorStatusID"});
    models.Contractor_Status.hasMany(models.Contractor, {foreignKey: "contractorID"});

    models.Clinic_Area.belongsTo(models.Hospital, {foreignKey: "hospitalID"});
    models.Hospital.hasMany(models.Clinic_Area, {foreignKey: "clinicID"});
  }
}
