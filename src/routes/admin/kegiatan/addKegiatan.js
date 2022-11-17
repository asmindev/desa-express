const { KegiatanDesa } = require('../../../../database/models');
const { uploadImage } = require('../../../../database/controll');

const addKegiatan = async (req, res) => {
    if (req.method === 'GET') {
        const kegiatan = await KegiatanDesa.find();
        res.render('admin/kegiatan/addKegiatan', {
            title: 'Potensi Desa', layout: 'layouts/main', kegiatan,
        });
    } else {
        try {
            const { name, description, date } = req.body;
            const { image } = req.files;
            const photo = await uploadImage(image, 'desa-konda/kegiatan-desa');
            const kegiatan = new KegiatanDesa({
                name,
                description,
                date,
                photo,
            });
            await kegiatan.save();
            const msg = {
                type: 'success',
                msg: 'Data berhasil ditambahkan',
            }
            req.flash('msg', msg);
            res.redirect('/admin/kegiatan-desa');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {
    addKegiatan,
};
