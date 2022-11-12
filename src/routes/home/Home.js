const Home = async (req, res) => {
    res.render('index', {
        title: 'Website resmi Konda 1', layout: 'layouts/main',
    });
};

module.exports = { Home };
