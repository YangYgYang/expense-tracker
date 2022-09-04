const express = require('express')
const router = express.Router()
const ACCschema = require('../../models/accounting')
const Userschema = require('../../models/user')

router.get('/', async(req, res) => {
    const userid = req.user.user_id
    const getAccounting = req.query
    let accDataFin = []
    let username = ''
    await Userschema.findOne({ _id: userid })
        .lean()
        .then((user) => {
            username = user.name + "的"
        })
        // console.log('進入首頁後', userid)
    await ACCschema.find({ userId: userid })
        .lean()
        .then((accData) => {
            console.log('到底有沒有東西', getAccounting)
            if (getAccounting.categoryId == 'none' || getAccounting.categoryId === undefined) {
                console.log('有進到這邊嗎')
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
            console.log('誰的記長笨哪', username)
            res.render('index', { accDataFin, subTotals, userid, accData, username })
        })
        .catch(error => console.log(error))
})

module.exports = router