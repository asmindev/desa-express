const { Home } = require('./home/Home');
const { Perangkat, addPerangkat } = require('./perangkat-desa/perangkat');
const { Administrasi, addAdministrasi } = require('./administrasi-desa/administrasi');
const { tentangDesa } = require('./about/about');

module.exports = {
    Home, Perangkat, addPerangkat, Administrasi, addAdministrasi, tentangDesa,
};
