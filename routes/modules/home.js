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
    const CATEGORYICON = {
        '1': {"icon":"material-symbols-outlined","name":"home"},
        '2': {"icon":"material-symbols-outlined","name":"directions_car"},
        '3': {"icon":"material-symbols-outlined","name":"local_mall"},
        '4': {"icon":"material-symbols-outlined","name":"restaurant"},
        '5': {"icon":"material-symbols-outlined","name":"finance_chip"}
      }
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
            if (getAccounting.categoryId == 'none' || getAccounting.categoryId === undefined || getAccounting.categoryId === "0") {
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

            for(let key in CATEGORYICON){
                if(acc.categoryId === key){
                    acc.categoryIcon = CATEGORYICON[key].icon
                    acc.categoryIconName = CATEGORYICON[key].name
                    return
                }
            }
            })
            res.render('index', { accDataFin, subTotals, userid, accData, username,categoryIdFin,CATEGORYICON })
        })
        .catch(error => console.log(error))
})

module.exports = router