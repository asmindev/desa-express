const { KegiatanDesa } = require('../../../database/models');

const kegiatanDesa = async (req, res) => {
    const kegiatan = await KegiatanDesa.find();
    res.render('kegiatan', {
        title: 'Kegiatan Desa', layout: 'layouts/main', kegiatan,
    });
};

module.exports = {
    kegiatanDesa,
};
