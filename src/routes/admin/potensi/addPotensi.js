const { PotensiDesa } = require('../../../../database/models');
const { uploadImage } = require('../../../../database/controll');

const addPotensi = async (req, res) => {
    if (req.method === 'GET') {
        const potensi = await PotensiDesa.find();
        res.render('admin/potensi/addPotensi', {
            title: 'Tambah Potensi Desa', layout: 'layouts/main', potensi,

        });
    } else {
        try {
            const { name, description, category } = req.body;
            const { image } = req.files;
            const photo = await uploadImage(image, 'desa-konda/potensi-desa');
            const potensi = new PotensiDesa({
                name,
                description,
                type: category,
                photo,
            });
            await potensi.save();
            const msg = {
                type: 'success',
                msg: 'Data berhasil ditambahkan',
            }
            req.flash('msg', msg);
            res.redirect('/admin/potensi-desa');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {
    addPotensi,
};
