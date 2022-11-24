const { PerangkatDesa } = require('../../../../database/models');
const { uploadImage } = require('../../../../database/controll');

const addPerangkat = async (req, res) => {
    if (req.method === 'GET') {
        const perangkat = await PerangkatDesa.find();
        res.render('admin/perangkat/addPerangkat', {
            title: 'Edit Perangkat Desa', layout: 'layouts/main', perangkat,
        });
    } else {
        try {
            const { name, position, number } = req.body;
            const { image } = req.files;
            const photo = await uploadImage(image, 'desa-konda/perangkat-desa');
            const Perangkat = new PerangkatDesa({
                name,
                position,
                number,
                photo,
            });
            await Perangkat.save();
            const msg = {
                type: 'success',
                msg: 'Data berhasil ditambahkan',
            }
            req.flash('msg', msg);
            res.redirect('/admin/perangkat-desa');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {
    addPerangkat,
};
