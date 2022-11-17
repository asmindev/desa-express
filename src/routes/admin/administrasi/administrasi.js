const { AdministrasiDesa } = require('../../../../database/models');
require('dotenv').config();

const adminAdministrasi = async (req, res) => {
    const administrasi = await AdministrasiDesa.find()
    const msg = req.flash('msg');
    console.log(administrasi);
    res.render('admin/administrasi/administrasi', {
        title: 'Administrasi Admin', layout: 'layouts/main', administrasi, msg,
    });
}

module.exports = { adminAdministrasi };
