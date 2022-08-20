//為什麼要在每一個route前，都要引入express?
const express = require('express')
const router = express.Router()
const home = require('./modules/home')

router.use('/', home)

module.exports = router