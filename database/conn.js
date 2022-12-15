// connection to the database with mongoose
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const URI = process.env.MONGO_URI
if (!URI) {
    throw new Error('You must provide a MONGO_URI in .env file')
} else {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            console.log({ err })
        } else {
            console.log('connected to database')
        }
    })
}
