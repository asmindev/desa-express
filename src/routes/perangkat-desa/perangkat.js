const { PerangkatDesa } = require('../../../database/models');

const Perangkat = async (req, res) => {
    const perangkats = await PerangkatDesa.find();
    res.render('perangkat', {
        title: 'Perangkat Desa', layout: 'layouts/main', perangkats,
    });
};

module.exports = { Perangkat };
