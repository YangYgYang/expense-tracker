const express = require('express')
const router = express.Router()
const USERschema = require('../../models/user')
    // const jwt = require('../../config/jwt')
const jwt = require("jsonwebtoken")


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    const loginData = req.body
    USERschema.findOne({ email: loginData.email })
        .then((user) => {
            if (loginData.password === user.password) {
                const token = jwt.sign(user, 'SECRET');
                console.log(token)
                res.cookie('token', token);
                res.redirect('/')
            } else {
                res.redirect('register')
            }
        })
        .catch(error => console.log(error))
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
                    .then((user) => res.redirect('/'))
                    .catch(error => consoel.log(error))
            } else {
                res.redirect('login')
            }
        })
        .catch(error => consoel.log(error))
})

module.exports = router