require('dotenv').config();

const tentangDesa = async (req, res) => {
    res.render('admin/tentang/tentang', {
        title: 'Tentang Admin Page', layout: 'layouts/main',
    });
}

module.exports = { tentangDesa };
