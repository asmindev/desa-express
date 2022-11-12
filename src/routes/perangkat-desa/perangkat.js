const Perangkat = async (req, res) => {
    const perangkat = [
        {
            nama: 'Jumadin',
            jabatan: 'Kepala Desa',
            // foto from randomuser.me
            foto: 'https://picsum.photos/200/300',
        },
        {
            nama: 'Asep',
            jabatan: 'Sekretaris Desa',
            foto: 'https://picsum.photos/200/300',
        },
    ]
    res.render('perangkat', {
        title: 'Perangkat Desa', layout: 'layouts/main', perangkat,
    });
};

module.exports = { Perangkat };
