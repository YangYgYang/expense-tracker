const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const accounting = require('./modules/accounting')
const user = require('./modules/user')
const authMiddleware = require('../middleware/auth')


router.use('/user', user)
router.use('/accounting', authMiddleware, accounting)
router.use('/', authMiddleware, home)

module.exports = router