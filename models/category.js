const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: number,
        required: true
    }

})

//用todoSchema來產生一個名為"Todo"的Model。
module.exports = mongoose.model('category', categorySchema)