// handle 404 errors

module.exports = (req, res) => {
    res.status(404).render('404', {
        title: '404 Page Not Found', layout: 'layouts/main',
    });
}
