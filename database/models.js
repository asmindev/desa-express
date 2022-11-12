// database schema
const mongoose = require('mongoose')

const { Schema } = mongoose

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
})

module.exports = mongoose.model('Organization', organizationSchema)
