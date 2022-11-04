const mongoose = require('mongoose')
const accountingSchema = require('../accounting')
const userSchema = require('../user')
const bcrypt = require('bcryptjs')

//==========judge if is production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

mongoose.connect(process.env.EXPENCE_MONGODB_URI, { useNewUrlParser: true })
const db = mongoose.connection


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
        email: 'root@root.com',
        password: '12345678',
        __v: 0
    },
    {
        name: 'user2',
        email: 'root2@root.com',
        password: '12345678',
        __v: 0
    }
]


db.once('open', () => {
    const finUserSeeds = userSeeds.map((SEED_USER) => {
        //bcrypt同步寫法=> hash = bcrypt.hashSync(要加密的password, 加密係數)
        hash = bcrypt.hashSync(SEED_USER.password, 10)
        SEED_USER.password = hash
        return SEED_USER
    })
    console.log(finUserSeeds)
    userSchema.create(finUserSeeds)
        .then((user) => {
            console.log('新增之後的',user)
            console.log('userSeeder is done!')
            for(let i =0;i<AccSeed.length;i++){
                if(i<3){
                    AccSeed[i].userId = user[0]._id
                }else{
                    AccSeed[i].userId = user[1]._id
                }
            }
            accountingSchema.create(AccSeed)
                .then(() => {
                    db.close()
                    console.log('accountingSeeder is done!')
                })
                .catch(err => console.log(err))
        })

    .catch(err => console.log(err))

})