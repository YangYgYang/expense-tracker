const express = require('express')
const router = express.Router()



router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', (req, res) => {
    console.log(req.body)
})


module.exports = router