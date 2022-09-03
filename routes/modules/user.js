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
            if (user !== null && bcrypt.compareSync(loginData.password, user.password)) {
                let userData = {}
                let timeNow = (new Date().getTime()) / 1000 + 1800
                console.log(timeNow)
                userData.email = user.email
                const payload = {
                    'user_id': user._id + '',
                    'user_name': user.name,
                    'exp': timeNow
                }
                const token = jwt.sign(payload, 'SECRET');
                res.cookie('token', token);
                res.redirect('/')
            } else if (user !== null && !bcrypt.compareSync(loginData.password, user.password)) {
                console.log('登入密碼錯誤！')
                res.render('login', { error_msg: '帳號或密碼錯誤！' })
            } else if (user === null) {
                console.log('沒有這個登入帳號！')
                res.render('login', { error_msg: '帳號或密碼錯誤！' })
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
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(registerData.password, salt)
                registerData.password = hash
                USERschema.create(registerData)
                    .then((user) => {
                        req.flash('alert_msg', '請重新登入以繼續！')
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