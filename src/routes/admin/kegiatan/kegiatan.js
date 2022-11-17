const { KegiatanDesa } = require('../../../../database/models');
require('dotenv').config();

const adminKegiatan = async (req, res) => {
    const kegiatan = await KegiatanDesa.find()
    const msg = req.flash('msg');
    console.log(msg);
    console.log(kegiatan);
    res.render('admin/kegiatan/kegiatan', {
        title: 'Kegiatan', layout: 'layouts/main', kegiatan, msg,
    });
}

module.exports = { adminKegiatan };
