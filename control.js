const database = require('./database/models')
require('./database/conn')

const { KegiatanDesa } = database

KegiatanDesa.insertMany([
    {
        name: 'Pembangunan Jalan',
        photo: 'http://mengening-buleleng.desa.id/assets/files/artikel/kecil_1605497866WhatsApp%20Image%202020-11-15%20at%2008.50.02.jpeg',
        date: '2020-11-15',
        description: 'Pembangunan jalan di desa konda yang dilakukan oleh pemerintah desa konda',
    },
    {
        name: 'Musyawarah Desa',
        photo: 'https://www.matapublik.com/wp-content/uploads/2020/06/20200610_094003-1024x768.jpg',
        date: '2020-06-10',
        description: 'Musyawarah desa yang dilakukan oleh pemerintah desa konda',
    },
    {
        name: 'Gotong Royong',
        photo: 'https://mediacenter.bengkuluselatankab.go.id/wp-content/uploads/2019/12/IMG-20191216-WA0018-640x480.jpg',
        date: '2019-12-16',
        description: 'Gotong royong yang dilakukan oleh warga desa konda',
    },
])
