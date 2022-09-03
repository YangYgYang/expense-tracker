const express = require('express')
const router = express.Router()
const USERschema = require('../../models/user')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    const loginData = req.body
    USERschema.findOne({ email: loginData.email })
        .then((user) => {
            //這邊找回來的user有個userId會讓sign的第一個參數有問題
            if (user !== null && loginData.password === user.password) {
                let userData = {}
                let timeNow = (new Date().getTime()) / 1000 + 1800
                console.log(timeNow)
                userData.email = user.email
                const payload = {
                        'user_id': user._id + '',
                        'user_name': user.name,
                        'exp': timeNow
                    }
                    // console.log('payload可以產生偷啃', user._id + '', )
                const token = jwt.sign(payload, 'SECRET');
                // console.log('產生要放cookie的token', token)
                res.cookie('token', token);
                res.redirect('/')
            } else {
                req.flash(('success_msg', '您已成功登出！'))
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
    const errors = []
    console.log(registerData)

    if (registerData.name.length === 0 || registerData.email.length === 0 || registerData.password.length === 0 || registerData.confirmPassword.length === 0) {
        errors.push({ message: '所有欄位皆為必填!' })
        console.log('有進到錯誤訊息', errors)
    }

    if (req.body.password !== req.body.confirmPassword) {
        errors.push({ message: '密碼與驗證密碼不相符!' })
    }
    if (errors.length > 0) {
        return res.render('register', {
            errors,
            name: registerData.name,
            email: registerData.email
        })
    }

    USERschema.findOne({ email: registerData.email })
        .then((user) => {
            if (!user) {
                USERschema.create(registerData)
                    .then((user) => {
                        return res.redirect('/user/login')
                    })
                    .catch(error => console.log(error))
            } else {
                console.log('登入後要進到login')
                req.flash('alert_msg', '您可能已經註冊過！')
                res.redirect('/user/login')
            }
        })
        .catch(error => console.log(error))
})

router.post('/logout', (req, res) => {
    req.flash('success_msg', '您已成功登出！')
    res.clearCookie('token')
    return res.redirect('/user/login')
})

module.exports = router