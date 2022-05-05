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
var _accountType = require("./accountType");
var _login = require("./login");

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
  var accountType = _accountType(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);

  Contractor.belongsTo(Contractor_Status, { as: "contractorStatus", foreignKey: "contractorStatusID"});
  Contractor_Status.hasMany(Contractor, { as: "Contractors", foreignKey: "contractorStatusID"});
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
    accountType,
    login,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
