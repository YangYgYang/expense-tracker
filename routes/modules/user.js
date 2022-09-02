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
            //這邊找回來的user有個userId會讓sign的第一個參數有問題
            // console.log('看一下user是什麼', user)
            if (user !== null && loginData.password === user.password) {
                let userData = {}
                let timeNow = (new Date().getTime()) / 1000 + 1800
                console.log(timeNow)
                userData.email = user.email
                const payload = {
                    'user_id': user._id + '',
                    'user_name': user.name,
                    'user_email': user.email,
                    'exp': timeNow
                }
                console.log('payload可以產生偷啃', user._id + '', )
                const token = jwt.sign(payload, 'SECRET');
                console.log('產生要放cookie的token', token)
                res.cookie('token', token);
                res.redirect('/')
            } else {
                res.redirect('/user/register', { message: "帳號或密碼錯誤！" })
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