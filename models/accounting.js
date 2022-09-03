const mongoose = require('mongoose')
const Schema = mongoose.Schema
const accountingSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    categoryId: {
        type: String
    },
    subTotal: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        index: true, //可加快 database搜尋速度(用index搜尋的意思)
        required: true
    },


})

module.exports = mongoose.model('accounting', accountingSchema)