const { PerangkatDesa } = require('../../../../database/models');
const { uploadImage, deleteImage } = require('../../../../database/controll');

const editPerangkat = async (req, res) => {
    if (req.method === 'GET') {
        // get params from url
        const { id } = req.params;
        const perangkat = await PerangkatDesa.findById(id);
        res.render('admin/perangkat/editPerangkat', {
            title: 'Kegiatan Desa', layout: 'layouts/main', perangkat,

        });
    } else {
        try {
            const {
                name, position, number, id,
            } = req.body;
            if (req.files) {
                const { image } = req.files;
                console.log({ id })
                const get = await PerangkatDesa.findById(id);
                console.log(get);
                const publicId = get.photo.public_id;
                const del = await deleteImage(publicId);
                console.log({ del });
                const photo = await uploadImage(image, 'desa-konda/perangkat-desa');
                await PerangkatDesa.findByIdAndUpdate(id, {
                    name,
                    position,
                    number,
                    photo,
                });
            } else {
                await PerangkatDesa.findByIdAndUpdate(id, {
                    name,
                    position,
                    number,
                });
            }

            const msg = {
                type: 'success',
                msg: 'Data berhasil diubah',
            }
            req.flash('msg', msg);
            res.redirect('/admin/perangkat-desa');
        } catch (error) {
            console.log(error);
            req.flash('msg', {
                type: 'danger',
                msg: 'Data gagal diubah',
            });
            res.redirect('/admin/perangkat-desa');
        }
    }
};

module.exports = {
    editPerangkat,
};
