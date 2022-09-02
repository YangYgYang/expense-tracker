const express = require('express')
const router = express.Router()
const ACCschema = require('../../models/accounting')



router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', (req, res) => {
    let getAccounting = req.body
    console.log('印出帳本', getAccounting)
    getAccounting.userId = req.user.user_id
    ACCschema.create(getAccounting)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    let accountingID = req.body._id
    ACCschema.findOne({ accountingID })
        .then((accounting) => {
            //這邊使用同步的點，是因為必須有先後順序，不然會一直還沒刪除，就redirect
            accounting.remove({}, (err, docs) => {
                console.log('err', err)
                console.log('docs', docs)
                res.redirect('/')
            })

        })
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    let accountingID = req.params.id
    ACCschema.findOne({ _id: accountingID })
        .lean()
        .then((accounting) => {
            res.render('edit', accounting)
        })
        .catch(error => console.log(error))
})

router.put('/:id/edit', (req, res) => {
    let accountingID = req.params.id
    let getAccounting = req.body
    ACCschema.update({ _id: accountingID }, getAccounting)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})



module.exports = router