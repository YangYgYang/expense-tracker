const express = require('express')
const router = express.Router()
const ACCschema = require('../../models/accounting')

router.get('/', (req, res) => {
    const userid = req.user.user_id
    console.log('進入首頁後', userid)
    ACCschema.find({ userId: userid })
        .lean()
        .then((accData) => {
            let subTotals = 0
            accData.forEach(acc => {
                subTotals += acc.subTotal
            })
            console.log(subTotals)
            res.render('index', { accData, subTotals })
        })
        .catch(error => console.log(error))

})

module.exports = router