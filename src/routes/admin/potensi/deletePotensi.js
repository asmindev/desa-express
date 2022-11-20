// delete from data
const { PotensiDesa } = require('../../../../database/models');
const { deleteImage } = require('../../../../database/controll');

const deletePotensi = async (req, res) => {
    // method post
    if (req.method === 'POST') {
        const { id } = req.body;
        const result = await PotensiDesa.findById(id);
        if (result) {
            const publicId = result.photo.public_id;
            await deleteImage(publicId);
            await result.remove();
            req.flash('msg', {
                type: 'success',
                msg: 'Data berhasil dihapus',
            });
        } else {
            req.flash('msg', {
                type: 'danger',
                msg: 'Data gagal dihapus',
            });
        }

        res.redirect('/admin/potensi-desa');
    } else {
        res.send('Method not allowed');
    }
};

module.exports = {
    deletePotensi,
};
