const { Desa } = require('../../../database/models');
require('dotenv').config();

const Home = async (req, res) => {
    const name = process.env.DESA;
    const desa = await Desa.findOne({ name });
    console.log({ desa });
    res.render('index', {
        title: 'Website resmi Konda 1', layout: 'layouts/main', desa,
    });
};

module.exports = { Home };
