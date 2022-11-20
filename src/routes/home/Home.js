const {
    Desa, PerangkatDesa, PotensiDesa, KegiatanDesa,
} = require('../../../database/models');
require('dotenv').config();

const Home = async (req, res) => {
    const name = process.env.DESA_ID;
    const desa = await Desa.findById(name.trim());
    const perangkatDesa = await PerangkatDesa.find()
    const potensi = await PotensiDesa.find()
    const kegiatan = await KegiatanDesa.find()
    // shuffle array and get 3 random element
    const randomPerangkat = perangkatDesa.sort(() => 0.5 - Math.random()).slice(0, 3);
    const randomPotensi = potensi.sort(() => 0.5 - Math.random()).slice(0, 3);
    const randomKegiatan = kegiatan.sort(() => 0.5 - Math.random()).slice(0, 3);
    console.log({
        desa, randomPerangkat, randomPotensi, randomKegiatan,
    });
    desa.orgs = randomPerangkat;
    desa.potensi = randomPotensi;
    desa.kegiatan = randomKegiatan;
    res.render('index', {
        title: 'Website resmi Konda 1', layout: 'layouts/main', desa,
    });
};

module.exports = { Home };
