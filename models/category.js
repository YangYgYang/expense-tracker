const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('category', categorySchema)