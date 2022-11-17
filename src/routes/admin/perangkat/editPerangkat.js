const { PerangkatDesa } = require('../../../../database/models');
const { uploadImage } = require('../../../../database/controll');

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
            console.log(req.body);
            const { image } = req.files;
            const photo = await uploadImage(image, 'desa-konda/perangkat-desa');
            const updatePerangkat = await PerangkatDesa.findByIdAndUpdate(id, {
                name,
                position,
                number,
                photo,
            });

            console.log(updatePerangkat);
            const msg = {
                type: 'success',
                msg: 'Data berhasil diubah',
            }
            req.flash('msg', msg);
            res.redirect('/admin/perangkat-desa');
        } catch (error) {
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
