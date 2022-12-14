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
        '1': "home",
        '2': "shuttle-van",
        '3': "grin-beam",
        '4': "utensils",
        '5': "pen"
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
                        acc.categoryIconName = CATEGORYICON[key]
                        break
                    }
                }
            })
            res.render('index', { accDataFin, subTotals, userid, accData, username,categoryIdFin,CATEGORYICON })
        })
        .catch(error => console.log(error))
})

module.exports = router