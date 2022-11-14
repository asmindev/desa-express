const { Home } = require('./home/Home');
const { Perangkat, addPerangkat } = require('./perangkat-desa/perangkat');
const { Administrasi, addAdministrasi } = require('./administrasi-desa/administrasi');

module.exports = {
    Home, Perangkat, addPerangkat, Administrasi, addAdministrasi,
};
