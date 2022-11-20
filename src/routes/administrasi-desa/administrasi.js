const { AdministrasiDesa } = require('../../../database/models');

const Administrasi = async (req, res) => {
    const administrasi = await AdministrasiDesa.find();
    res.render('administrasi', {
        title: 'Administrasi', layout: 'layouts/main', administrasi,
    });
}

module.exports = { Administrasi };
