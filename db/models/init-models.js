var DataTypes = require("sequelize").DataTypes;
var _Assigned_Clinic_Area = require("./Assigned_Clinic_Area");
var _Assigned_Module = require("./Assigned_Module");
var _Assigned_Rental_Car = require("./Assigned_Rental_Car");
var _Clinic_Area = require("./Clinic_Area");
var _Contractor = require("./Contractor");
var _Contractor_Flight = require("./Contractor_Flight");
var _Contractor_Project = require("./Contractor_Project");
var _Contractor_Status = require("./Contractor_Status");
var _EMR = require("./EMR");
var _Flight = require("./Flight");
var _Hospital = require("./Hospital");
var _Module = require("./Module");
var _Preferred_Module = require("./Preferred_Module");
var _Project = require("./Project");
var _Project_Status = require("./Project_Status");
var _Rental_Car = require("./Rental_Car");

function initModels(sequelize) {
  var Assigned_Clinic_Area = _Assigned_Clinic_Area(sequelize, DataTypes);
  var Assigned_Module = _Assigned_Module(sequelize, DataTypes);
  var Assigned_Rental_Car = _Assigned_Rental_Car(sequelize, DataTypes);
  var Clinic_Area = _Clinic_Area(sequelize, DataTypes);
  var Contractor = _Contractor(sequelize, DataTypes);
  var Contractor_Flight = _Contractor_Flight(sequelize, DataTypes);
  var Contractor_Project = _Contractor_Project(sequelize, DataTypes);
  var Contractor_Status = _Contractor_Status(sequelize, DataTypes);
  var EMR = _EMR(sequelize, DataTypes);
  var Flight = _Flight(sequelize, DataTypes);
  var Hospital = _Hospital(sequelize, DataTypes);
  var Module = _Module(sequelize, DataTypes);
  var Preferred_Module = _Preferred_Module(sequelize, DataTypes);
  var Project = _Project(sequelize, DataTypes);
  var Project_Status = _Project_Status(sequelize, DataTypes);
  var Rental_Car = _Rental_Car(sequelize, DataTypes);

  Clinic_Area.belongsToMany(Contractor, { as: 'contractorID_Contractors', through: Assigned_Clinic_Area, foreignKey: "clinicID", otherKey: "contractorID" });
  Contractor.belongsToMany(Clinic_Area, { as: 'clinicID_Clinic_Areas', through: Assigned_Clinic_Area, foreignKey: "contractorID", otherKey: "clinicID" });
  Contractor.belongsToMany(Flight, { as: 'flightID_Flights', through: Contractor_Flight, foreignKey: "contractorID", otherKey: "flightID" });
  Contractor.belongsToMany(Module, { as: 'moduleID_Modules', through: Preferred_Module, foreignKey: "contractorID", otherKey: "moduleID" });
  Contractor.belongsToMany(Project, { as: 'projectID_Projects', through: Contractor_Project, foreignKey: "contractorID", otherKey: "projectID" });
  Contractor.belongsToMany(Rental_Car, { as: 'rentalCarID_Rental_Cars', through: Assigned_Rental_Car, foreignKey: "contractorID", otherKey: "rentalCarID" });
  Flight.belongsToMany(Contractor, { as: 'contractorID_Contractor_Contractor_Flights', through: Contractor_Flight, foreignKey: "flightID", otherKey: "contractorID" });
  Module.belongsToMany(Contractor, { as: 'contractorID_Contractor_Preferred_Modules', through: Preferred_Module, foreignKey: "moduleID", otherKey: "contractorID" });
  Project.belongsToMany(Contractor, { as: 'contractorID_Contractor_Contractor_Projects', through: Contractor_Project, foreignKey: "projectID", otherKey: "contractorID" });
  Rental_Car.belongsToMany(Contractor, { as: 'contractorID_Contractor_Assigned_Rental_Cars', through: Assigned_Rental_Car, foreignKey: "rentalCarID", otherKey: "contractorID" });
  Assigned_Clinic_Area.belongsTo(Clinic_Area, { as: "clinic", foreignKey: "clinicID"});
  Clinic_Area.hasMany(Assigned_Clinic_Area, { as: "Assigned_Clinic_Areas", foreignKey: "clinicID"});
  Assigned_Clinic_Area.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Assigned_Clinic_Area, { as: "Assigned_Clinic_Areas", foreignKey: "contractorID"});
  Assigned_Module.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Assigned_Module, { as: "Assigned_Modules", foreignKey: "contractorID"});
  Assigned_Rental_Car.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Assigned_Rental_Car, { as: "Assigned_Rental_Cars", foreignKey: "contractorID"});
  Contractor_Flight.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Contractor_Flight, { as: "Contractor_Flights", foreignKey: "contractorID"});
  Contractor_Project.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Contractor_Project, { as: "Contractor_Projects", foreignKey: "contractorID"});
  Preferred_Module.belongsTo(Contractor, { as: "contractor", foreignKey: "contractorID"});
  Contractor.hasMany(Preferred_Module, { as: "Preferred_Modules", foreignKey: "contractorID"});
  Contractor.belongsTo(Contractor_Status, { as: "contractorStatus", foreignKey: "contractorStatusID"});
  Contractor_Status.hasMany(Contractor, { as: "Contractors", foreignKey: "contractorStatusID"});
  Module.belongsTo(EMR, { as: "emr", foreignKey: "emrID"});
  EMR.hasMany(Module, { as: "Modules", foreignKey: "emrID"});
  Contractor_Flight.belongsTo(Flight, { as: "flight", foreignKey: "flightID"});
  Flight.hasMany(Contractor_Flight, { as: "Contractor_Flights", foreignKey: "flightID"});
  Clinic_Area.belongsTo(Hospital, { as: "hospital", foreignKey: "hospitalID"});
  Hospital.hasMany(Clinic_Area, { as: "Clinic_Areas", foreignKey: "hospitalID"});
  Project.belongsTo(Hospital, { as: "hospital", foreignKey: "hospitalID"});
  Hospital.hasMany(Project, { as: "Projects", foreignKey: "hospitalID"});
  Assigned_Module.belongsTo(Module, { as: "module", foreignKey: "moduleID"});
  Module.hasMany(Assigned_Module, { as: "Assigned_Modules", foreignKey: "moduleID"});
  Preferred_Module.belongsTo(Module, { as: "module", foreignKey: "moduleID"});
  Module.hasMany(Preferred_Module, { as: "Preferred_Modules", foreignKey: "moduleID"});
  Assigned_Module.belongsTo(Project, { as: "project", foreignKey: "projectID"});
  Project.hasMany(Assigned_Module, { as: "Assigned_Modules", foreignKey: "projectID"});
  Contractor_Project.belongsTo(Project, { as: "project", foreignKey: "projectID"});
  Project.hasMany(Contractor_Project, { as: "Contractor_Projects", foreignKey: "projectID"});
  Project.belongsTo(Project_Status, { as: "projectStatus", foreignKey: "projectStatusID"});
  Project_Status.hasMany(Project, { as: "Projects", foreignKey: "projectStatusID"});
  Assigned_Rental_Car.belongsTo(Rental_Car, { as: "rentalCar", foreignKey: "rentalCarID"});
  Rental_Car.hasMany(Assigned_Rental_Car, { as: "Assigned_Rental_Cars", foreignKey: "rentalCarID"});

  return {
    Assigned_Clinic_Area,
    Assigned_Module,
    Assigned_Rental_Car,
    Clinic_Area,
    Contractor,
    Contractor_Flight,
    Contractor_Project,
    Contractor_Status,
    EMR,
    Flight,
    Hospital,
    Module,
    Preferred_Module,
    Project,
    Project_Status,
    Rental_Car,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
