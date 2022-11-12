// connection to the database with mongoose
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to database')
    }
})
