const express = require('express')
const router = express.Router()
const ACCschema = require('../../models/accounting')



router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', (req, res) => {
    let accounting = req.body
    ACCschema.create(accounting)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


module.exports = router