const express = require('express')

const router = express.Router({ caseSensitive: true })

const home = require('./home')
const account = require('./account')
const EMR = require('./EMR')

router.use('/api/home', home)
router.use('/api/account', account)
router.use('/api/EMR', EMR)
module.exports = router
