const express = require('express')
const router = express.Router()
const USERschema = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const registerData = req.body
    console.log(registerData)
    USERschema.findOne({ email: registerData.email })
        .then((user) => {
            if (!user) {
                USERschema.create(registerData)
                    .then(() => res.redirect('/'))
                    .catch(error => consoel.log(error))
            } else {
                res.redirect('login')
            }
        })
        .catch(error => consoel.log(error))
})

module.exports = router