const database = require('./database/models')
require('./database/conn')

const {
    PerangkatDesa,
} = database
const perangkats = [
    {
        name: 'Agusalim, S.Sos, MAP',
        position: 'Kepala Desa',
        photo: 'agusalim.jpg',
        number: '082812345678',
    },
    {
        name: 'Asmaun, SH',
        position: 'Sekretaris Desa',
        photo: 'sriwahyuni.jpg',
        number: '082812345678',
    },
    {
        name: 'Trinil C',
        position: 'Kasi Pemerintahan',
        photo: 'trinil.jpg',
        number: '082812345678',
    },
    {
        name: 'Anjas A',
        position: 'Kasi Kesejahteraan',
        photo: 'anjas.jpg',
        number: '082812345678',
    },
    {
        name: 'Sarmin',
        position: 'Kasi Pelayanan',
        photo: 'sarmin.jpg',
        number: '082812345678',
    },
    {
        name: 'Isrofil',
        position: 'Kadus',
        photo: 'isrofil.jpg',
        number: '082812345678',
    },
    {
        name: 'Jasman',
        position: 'Kadus',
        photo: 'jasman.jpg',
        number: '082812345678',
    },
]

const Seed = async () => {
    const seed = await PerangkatDesa.insertMany(perangkats)
    console.log(seed)
}

Seed()
