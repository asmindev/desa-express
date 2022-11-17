const { PotensiDesa } = require('../../../../database/models');
const { uploadImage } = require('../../../../database/controll');

const editPotensi = async (req, res) => {
    if (req.method === 'GET') {
        // get params from url
        const { id } = req.params;
        const potensi = await PotensiDesa.findById(id);
        res.render('admin/potensi/editPotensi', {
            title: 'Potensi Desa', layout: 'layouts/main', potensi,

        });
    } else {
        try {
            const {
                name, description, category, id,
            } = req.body;
            console.log(req.body);
            const { image } = req.files;
            const photo = await uploadImage(image, 'desa-konda/potensi-desa');
            const updatePotensi = await PotensiDesa.findByIdAndUpdate(id, {
                name,
                description,
                type: category,
                photo,
            });

            console.log(updatePotensi);
            const msg = {
                type: 'success',
                msg: 'Data berhasil diubah',
            }
            req.flash('msg', msg);
            res.redirect('/admin/potensi-desa');
        } catch (error) {
            req.flash('msg', {
                type: 'danger',
                msg: 'Data gagal diubah',
            });
            res.redirect('/admin/potensi-desa');
        }
    }
};

module.exports = {
    editPotensi,
};
