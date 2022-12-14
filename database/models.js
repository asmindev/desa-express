// database schema
const mongoose = require('mongoose')

const { Schema } = mongoose

const desaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    population: {
        type: Number,
        required: true,
    },
    vision: {
        type: String,
        required: true,
    },
    mission: {
        type: Array,
        required: true,
    },
    openingSpech: {
        type: String,
        required: true,
    },

})

const potensiSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    photo: {
        type: Object,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})
const kegiatanSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: Object,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

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
        type: Object,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
})
const administrationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    fields: [
        {
            type: String,
            required: true,
        },
    ],
})
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    // password hash with bcrypt
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
})

const User = mongoose.model('User', userSchema)
const Desa = mongoose.model('Desa', desaSchema)
const KegiatanDesa = mongoose.model('kegiatan', kegiatanSchema)
const PotensiDesa = mongoose.model('potensi', potensiSchema)
const AdministrasiDesa = mongoose.model('administration', administrationSchema)
const PerangkatDesa = mongoose.model('perangkat', organizationSchema)
module.exports = {
    PerangkatDesa, AdministrasiDesa, PotensiDesa, KegiatanDesa, Desa, User,
}
