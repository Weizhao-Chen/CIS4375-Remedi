const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')
const account = require('./account')
const EMR = require('./EMR')
const Project_Status = require('./Project_Status')
const Contractor_Status = require('./Contractor_Status')
const Airline = require('./Airline')
const Module = require('./Module')

router.use('/api/home', home)
router.use('/api/account', account)
router.use('/api/EMR', EMR)
router.use('/api/Project_Status', Project_Status)
router.use('/api/Contractor_Status', Contractor_Status)
router.use('/api/Airline', Airline)
router.use('/api/Module', Module)
module.exports = router
