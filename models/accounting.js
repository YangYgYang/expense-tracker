const mongoose = require('mongoose')
const Schema = mongoose.Schema
const accountingSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String
    },
    subTotal: {
        type: Number
    }

})

//用todoSchema來產生一個名為"Todo"的Model。
module.exports = mongoose.model('accounting', accountingSchema)