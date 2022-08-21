const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const accounting = require('./modules/accounting')
const user = require('./modules/user')


router.use('/user', user)
router.use('/accounting', accounting)
router.use('/', home)

module.exports = router