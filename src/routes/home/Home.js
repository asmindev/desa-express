const {
    Desa, PerangkatDesa, PotensiDesa, KegiatanDesa,
} = require('../../../database/models');
require('dotenv').config();

const Home = async (req, res) => {
    const name = process.env.DESA;
    const desa = await Desa.findOne({ name });
    const perangkatDesa = await PerangkatDesa.find()
    const potensi = await PotensiDesa.find().limit(3)
    const kegiatan = await KegiatanDesa.find().limit(3)
    desa.orgs = {
        kepalaDesa: perangkatDesa.find((org) => org.position === 'Kepala Desa'),
        sekretarisDesa: perangkatDesa.find((org) => org.position === 'Sekretaris Desa'),
        kasiPelayanan: perangkatDesa.find((org) => org.position === 'Kasi Pelayanan'),
    }
    desa.potensi = potensi
    desa.kegiatan = kegiatan
    res.render('index', {
        title: 'Website resmi Konda 1', layout: 'layouts/main', desa,
    });
};

module.exports = { Home };
