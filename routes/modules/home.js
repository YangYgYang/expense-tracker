const express = require('express')
const router = express.Router()
const ACCschema = require('../../models/accounting')

router.get('/', (req, res) => {
    ACCschema.find()
        .lean()
        .then((accData) => {
            res.render('index', { accData })
        })
        .catch(error => console.log(error))

})

module.exports = router