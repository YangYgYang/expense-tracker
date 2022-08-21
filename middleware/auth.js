const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    if (!req.headers.cookie) {
        console.log(req.headers.cookie)
            // console.log(req)
        console.log('驗證失敗')
        return res.redirect('/user/login')
    }
    let token = req.headers.cookie
    console.log('驗證這邊的token', token.slice(6))
    jwt.verify(token, 'SECRET')
        .then((decoded) => {
            console.log(decoded)
            return next()
        })
        .catch(error => {
            console.log(error)
            return res.redirect('/login')
        })



    // (err, payload) => {
    //     if (err) {
    //         console.log('錯誤的亮牌', err); // 驗證失敗回傳錯誤
    //         return res.redirect('/user/login')
    //     } else {
    //         console.log(payload);
    //         return next()

    // function(err, decoded) {
    //     if (err) {
    //         return res.redirect('/login')
    //             // return res.status(401).json({ message: 'Unauthorized!' })
    //     } else {
    //         next()
    //     }
    // });
}

module.exports = authentication