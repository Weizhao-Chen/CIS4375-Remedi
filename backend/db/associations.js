module.exports = {
  associate: models => {
    //below is for future and testing purpose
    models.login.belongsTo(models.accountType)

    //this does the PK/FK connecting
    //top uses the one below
    models.Module.belongsTo(models.EMR, {foreignKey: "emrID"});
    models.EMR.hasMany(models.Module, {foreignKey: "emrID"});

    models.Contractor.belongsTo(models.Contractor_Status, {foreignKey: "contractorStatusID"});
    models.Contractor_Status.hasMany(models.Contractor, {foreignKey: "contractorStatusID"});

    models.Clinic_Area.belongsTo(models.Hospital, {foreignKey: "hospitalID"});
    models.Hospital.hasMany(models.Clinic_Area, {foreignKey: "hospitalID"});

    models.Assigned_Clinic_Area.belongsTo(models.Contractor, {foreignKey: "contractorID"});
    models.Assigned_Clinic_Area.belongsTo(models.Clinic_Area, {foreignKey: "clinicID"});

    models.Project.belongsTo(models.Hospital, {foreignKey: "hospitalID"});
    models.Hospital.hasMany(models.Project, {foreignKey: "hospitalID"});
    models.Project.belongsTo(models.Project_Status, {foreignKey: "projectStatusID"});

    models.Contractor_Project.belongsTo(models.Project, {foreignKey: "projectID"});
    models.Contractor_Project.belongsTo(models.Contractor, {foreignKey: "contractorID"});

    // models.Contractor_Project.hasMany(models.Contractor, {foreignKey: "projectStatusID"});
    // models.Contractor_Project.hasMany(models.Project, {foreignKey: "projectStatusID"});
  }
}
