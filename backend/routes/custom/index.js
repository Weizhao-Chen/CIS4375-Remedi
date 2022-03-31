const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')
const account = require('./account')
const EMR = require('./EMR')
const Project_Status = require('./Project_Status')
const Contractor_Status = require('./Contractor_Status')
const Rental_Car_Company = require('./Rental_Car_Company')

router.use('/api/home', home)
router.use('/api/account', account)
router.use('/api/EMR', EMR)
router.use('/api/Project_Status', Project_Status)
router.use('/api/Contractor_Status', Contractor_Status)
router.use('/api/Rental_Car_Company', Rental_Car_Company)
module.exports = router
