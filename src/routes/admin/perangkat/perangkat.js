const { PerangkatDesa } = require('../../../../database/models');
require('dotenv').config();

const adminPerangkat = async (req, res) => {
    const perangkat = await PerangkatDesa.find()
    const msg = req.flash('msg');
    res.render('admin/perangkat/perangkat', {
        title: 'Kegiatan', layout: 'layouts/main', perangkat, msg,
    });
}
module.exports = { adminPerangkat };
