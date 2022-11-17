const { PotensiDesa } = require('../../../../database/models');
require('dotenv').config();

const adminPotensi = async (req, res) => {
    const potensi = await PotensiDesa.find()
    const msg = req.flash('msg');
    console.log(msg);
    res.render('admin/potensi/potensi', {
        title: 'Potensi Admin', layout: 'layouts/main', potensi, msg,
    });
}

module.exports = { adminPotensi };
