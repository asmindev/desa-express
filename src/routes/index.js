const { Home } = require('./home/Home');
const { Perangkat, addPerangkat } = require('./perangkat-desa/perangkat');
const { Administrasi, addAdministrasi } = require('./administrasi-desa/administrasi');
const { tentangDesa } = require('./about/about');
const { potensiDesa } = require('./potensi/potensi');
const { kegiatanDesa } = require('./kegiatan/kegiatan');

module.exports = {
    Home,
    Perangkat,
    addPerangkat,
    Administrasi,
    addAdministrasi,
    tentangDesa,
    potensiDesa,
    kegiatanDesa,
};
