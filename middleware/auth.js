const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    if (!req.cookies) {
        console.log('驗證失敗')
        return res.redirect('/user/login')
    }
    let token = req.cookies.token
        // console.log('新裝的cookie', req.cookies)
        // console.log('驗證這邊的token', token)
    jwt.verify(token, process.env.TOKENSECRET, (err, decoded) => {
        if (err) {
            res.clearCookie('token')
            return res.redirect('/user/login')
        }
        req.user = decoded
            // console.log(decoded)
            // console.log(err)
        return next()
    })
}


module.exports = authentication