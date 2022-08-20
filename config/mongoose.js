const mongoose = require("mongoose")
    //connect的uri我目前都是放在本機的env環境變數裡，亦可用別種方法，放在.env裡面，
    //現在的做法，要記得去修改本機隱藏檔案.bashrc，並把vscode整個關掉重開
    //發現在要連線mogodb的時候，並不需要先上mogodb新增collection．好像在連線或是create後就會直接新增collection
mongoose.connect(process.env.EXPENCE_MONGODB_URI, { useNewUrlParser: true })
    //optional:{useUnifiedTopology: true, useCreateIndex: true}

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db