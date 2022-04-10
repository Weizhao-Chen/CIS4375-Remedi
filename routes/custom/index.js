const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')
const account = require('./account')
const EMR = require('./EMR')
const Project_Status = require('./Project_Status')
const Contractor_Status = require('./Contractor_Status')
const Airline = require('./Airline')
const Module = require('./Module')
const Hospital = require('./Hospital')
const Rental_Car_Company = require('./Rental_Car_Company')
const Contractor = require('./Contractor')
const Clinic_Area = require('./Clinic_Area')
const Assigned_Clinic_Area = require('./Assigned_Clinic_Area')
const Project = require('./Project')
const Contractor_Project = require('./Contractor_Project')
const Preferred_Module = require('./Preferred_Module')
const Assigned_Module = require('./Assigned_Module')
const Flight = require('./Flight')
const Rental_Car = require('./Rental_Car')
const Assigned_Rental_Car = require('./Assigned_Rental_Car')

router.use('/api/home', home)
router.use('/api/account', account)
router.use('/api/EMR', EMR)
router.use('/api/Project_Status', Project_Status)
router.use('/api/Contractor_Status', Contractor_Status)
router.use('/api/Airline', Airline)
router.use('/api/Module', Module)
router.use('/api/Hospital', Hospital)
router.use('/api/Rental_Car_Company', Rental_Car_Company)
router.use('/api/Contractor', Contractor)
router.use('/api/Clinic_Area', Clinic_Area)
router.use('/api/Assigned_Clinic_Area', Assigned_Clinic_Area)
router.use('/api/Project', Project)
router.use('/api/Contractor_Project', Contractor_Project)
router.use('/api/Preferred_Module', Preferred_Module)
router.use('/api/Assigned_Module', Assigned_Module)
router.use('/api/Flight', Flight)
router.use('/api/Rental_Car', Rental_Car)
router.use('/api/Assigned_Rental_Car', Assigned_Rental_Car)

module.exports = router
