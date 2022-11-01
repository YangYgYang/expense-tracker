const express = require('express')
const router = express.Router()
const ACCschema = require('../../models/accounting')
const Userschema = require('../../models/user')

router.get('/', async(req, res) => {
    const userid = req.user.user_id
    const getAccounting = req.query
    let accDataFin = []
    let username = ''
    const categoryIdFin = getAccounting.categoryId
    await Userschema.findOne({ _id: userid })
        .lean()
        .then((user) => {
            username = user.name + "的"
        })
        .catch(error => console.log(error))
        // console.log('進入首頁後', userid)
    await ACCschema.find({ userId: userid })
        .lean()
        .then((accData) => {
            if (getAccounting.categoryId == 'none' || getAccounting.categoryId === undefined) {
                accDataFin = accData
            } else {
                accDataFin = accData.filter(e => e.categoryId === getAccounting.categoryId)
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
            res.render('index', { accDataFin, subTotals, userid, accData, username,categoryIdFin })
        })
        .catch(error => console.log(error))
})

module.exports = router