const database = require('./database/models')
require('./database/conn')

const {
    Desa,
} = database

const desa = new Desa({
    name: 'Konda 1',
    location: 'Konda, Kec. Konda, Kab. Konawe Selatan, Sulawesi Tenggara',
    population: 1000,
    vision: 'Terwujudnya Desa Konda 1 yang sejahtera, mandiri, dan berdaya saing',
    mission: [
        'Meningkatkan kesejahteraan masyarakat melalui pemberdayaan ekonomi',
        'Meningkatkan kualitas pelayanan publik',
        'Menstabilkan keamanan dan ketertiban masyarakat',
        'menjaga dan meningkatkan kualitas lingkungan hidup',
        'Mensejahterakan masyarakat melalui pemberdayaan sosial',
    ],
})

desa.save().then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})
