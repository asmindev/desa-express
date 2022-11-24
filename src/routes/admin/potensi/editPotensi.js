const { PotensiDesa } = require('../../../../database/models');
const { uploadImage, deleteImage } = require('../../../../database/controll');

const editPotensi = async (req, res) => {
    if (req.method === 'GET') {
        // get params from url
        const { id } = req.params;
        const potensi = await PotensiDesa.findById(id);
        res.render('admin/potensi/editPotensi', {
            title: 'Edit Potensi Desa', layout: 'layouts/main', potensi,

        });
    } else {
        try {
            const {
                name, description, category, id,
            } = req.body;
            if (req.files) {
                const { image } = req.files;
                const photo = await uploadImage(image, 'desa-konda/potensi-desa');
                const result = await PotensiDesa.findById(id)
                const publicId = result.photo.public_id
                await deleteImage(publicId)
                await PotensiDesa.findByIdAndUpdate(id, {
                    name,
                    description,
                    category,
                    photo,
                });
            } else {
                await PotensiDesa.findByIdAndUpdate(id, {
                    name,
                    description,
                    type: category,
                });
            }

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
