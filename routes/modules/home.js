const express = require('express')
const router = express.Router()
const ACCschema = require('../../models/accounting')

router.get('/', (req, res) => {
    const userid = req.user.user_id
    const getAccounting = req.query
    let accDataFin = []
        // console.log('進入首頁後', userid)
    ACCschema.find({ userId: userid })
        .lean()
        .then((accData) => {
            if (getAccounting) {
                if (getAccounting.categoryId !== '0') {
                    console.log('進到修改路由', getAccounting)
                    accDataFin = accData.filter(e => e.categoryId === getAccounting.categoryId)
                } else {
                    accDataFin = accData
                }
            }
            let subTotals = 0
                // console.log(accData)
            accDataFin.map((acc) => {
                subTotals += acc.subTotal
                acc.date = {
                    year: acc.date.getFullYear(),
                    month: acc.date.getMonth() + 1,
                    day: acc.date.getDate()
                }
            })
            res.render('index', { accDataFin, subTotals, userid })
        })
        .catch(error => console.log(error))
})

module.exports = router