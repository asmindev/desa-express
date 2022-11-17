const { Home } = require('./home/Home');
const { Perangkat } = require('./perangkat-desa/perangkat');
const { Administrasi } = require('./administrasi-desa/administrasi');
const { tentangDesa } = require('./about/about');
const { potensiDesa } = require('./potensi/potensi');
const { kegiatanDesa } = require('./kegiatan/kegiatan');
const { Home: AdminHome } = require('./admin/home');
const { adminKegiatan } = require('./admin/kegiatan/kegiatan');
const { adminPotensi } = require('./admin/potensi/potensi');
const { addPotensi } = require('./admin/potensi/addPotensi');
const { editPotensi } = require('./admin/potensi/editPotensi');
const { deletePotensi } = require('./admin/potensi/deletePotensi');
const { addKegiatan } = require('./admin/kegiatan/addKegiatan');
const { editKegiatan } = require('./admin/kegiatan/editKegiatan');
const { deleteKegiatan } = require('./admin/kegiatan/deleteKegiatan');
const { adminPerangkat } = require('./admin/perangkat/perangkat');
const { addPerangkat } = require('./admin/perangkat/addPerangkat');
const { editPerangkat } = require('./admin/perangkat/editPerangkat');
const { deletePerangkat } = require('./admin/perangkat/deletePerangkat');

module.exports = {
    Home,
    Perangkat,
    addPerangkat,
    Administrasi,
    tentangDesa,
    potensiDesa,
    kegiatanDesa,
    AdminHome,
    adminKegiatan,
    adminPotensi,
    addPotensi,
    editPotensi,
    deletePotensi,
    addKegiatan,
    editKegiatan,
    deleteKegiatan,
    adminPerangkat,
    editPerangkat,
    deletePerangkat,
};
