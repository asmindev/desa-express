const tentangDesa = async (req, res) => {
    res.render('tentang-desa', {
        title: 'Tentang Desa Konda', layout: 'layouts/main',
    });
}

module.exports = { tentangDesa };
