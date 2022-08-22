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
            console.log('看一下user是什麼東西', user)
            let userData = {}
            userData.email = user.email
            if (loginData.password === user.password) {
                const token = jwt.sign(userData, 'SECRET');
                console.log('產生要放cookie的偷啃', token)
                res.cookie('token', token);
                res.redirect('/')
            } else {
                res.redirect('/user/register')
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
                    .then((user) => res.redirect('/user/login'))
                    .catch(error => console.log(error))
            } else {
                console.log('登入後要進到login', )
                res.redirect('/user/register')
            }
        })
        .catch(error => console.log(error))
})

module.exports = router