const { KegiatanDesa } = require('../../../../database/models');
const { uploadImage, deleteImage } = require('../../../../database/controll');

const editKegiatan = async (req, res) => {
    if (req.method === 'GET') {
        // get params from url
        const { id } = req.params;
        const kegiatan = await KegiatanDesa.findById(id);
        res.render('admin/kegiatan/editKegiatan', {
            title: 'Kegiatan Desa', layout: 'layouts/main', kegiatan,

        });
    } else {
        try {
            const {
                name, description, date, id,
            } = req.body;
            if (req.files) {
                const { image } = req.files;
                const photo = await uploadImage(image, 'desa-konda/kegiatan-desa');
                const result = await KegiatanDesa.findById(id);
                const publicId = result.photo.public_id;
                console.log({ publicId });
                await deleteImage(publicId);
                await KegiatanDesa.findByIdAndUpdate(id, {
                    name,
                    description,
                    date,
                    photo,
                });
            } else {
                await KegiatanDesa.findByIdAndUpdate(id, {
                    name,
                    description,
                    date,
                });
            }

            const msg = {
                type: 'success',
                msg: 'Data berhasil diubah',
            }
            req.flash('msg', msg);
            res.redirect('/admin/kegiatan-desa');
        } catch (error) {
            req.flash('msg', {
                type: 'danger',
                msg: 'Data gagal diubah',
            });
            res.redirect('/admin/kegiatan-desa');
        }
    }
};

module.exports = {
    editKegiatan,
};
