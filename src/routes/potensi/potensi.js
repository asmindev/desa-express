const { PotensiDesa } = require('../../../database/models');

const potensiDesa = async (req, res) => {
    if (req.method === 'GET') {
        const potensi = await PotensiDesa.find();
        res.render('potensi', {
            title: 'Potensi Desa', layout: 'layouts/main', potensi,

        });
    } else {
        res.send('Method not allowed');
    }
};

module.exports = {
    potensiDesa,
};
