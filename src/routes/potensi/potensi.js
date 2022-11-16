const { PotensiDesa } = require('../../../database/models');

const potensiDesa = async (req, res) => {
    const potensi = await PotensiDesa.find();
    res.render('potensi', {
        title: 'Potensi Desa', layout: 'layouts/main', potensi,
    });
};

module.exports = {
    potensiDesa,
};
