const mongoose = require('mongoose')
const accountingSchema = require('../accounting')
const userSchema = require('../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

//==========judge if is production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const AccSeed = [{
    item: '防毒面具',
    date: 2022 - 08 - 03,
    categoryId: '2',
    subTotal: 1200,
    __v: 0
}, {
    item: '酒',
    date: 2022 - 09 - 02,
    categoryId: '4',
    subTotal: 50,
    __v: 0
}, {
    item: '握壽司',
    date: 2022 - 08 - 03,
    categoryId: '4',
    subTotal: 280,
    __v: 0
}, {
    item: '太陽眼鏡',
    date: 2022 - 09 - 02,
    categoryId: '4',
    subTotal: 50,
    __v: 0
}, {
    item: '髒抹布',
    date: 2022 - 09 - 02,
    categoryId: '4',
    subTotal: 50,
    __v: 0
}]

const userSeeds = [{
        name: 'user1',
        email: 'ttt@ttt.com',
        password: '123',
        __v: 0
    },
    {
        name: 'user2',
        email: 'mail@mail.com',
        password: '12345678',
        __v: 0
    }
]




db.once('open', () => {
    userSeeds.map((SEED_USER) => {
        //bcrypt同步寫法=> hash = bcrypt.hashSync(要加密的password, 加密係數)
        hash = bcrypt.hashSync(SEED_USER.password, 10)
        SEED_USER.password = hash
    })

    userSchema.create(userSeeds)
        .then((users) => {
            // console.log('新增user之後', users)
            console.log('userSeeder is done!')
            users.forEach((user) => {
                if (user.name === 'user1') {
                    for (let i = 0; i < 3; i++) {
                        console.log('前面的Acc', AccSeed)
                        AccSeed[i].userId = user._id
                    }
                } else if (user.name === 'user2') {
                    for (let i = 3; i < 6; i++) {
                        console.log('後面的', AccSeed)
                        AccSeed[i].userId = user._id
                    }
                }
            })
            accountingSchema.create(AccSeed)
                .then(() => {
                    db.close()
                    console.log('User1 is done!')
                })
                .catch(err => console.log(err))
        })

    .catch(err => console.log(err))

})