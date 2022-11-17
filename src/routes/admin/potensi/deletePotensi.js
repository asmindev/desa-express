// delete from data
const { PotensiDesa } = require('../../../../database/models');

const deletePotensi = async (req, res) => {
    // method post
    if (req.method === 'POST') {
        const { id } = req.body;
        // delete from database
        const result = await PotensiDesa.findByIdAndDelete(id);
        // check if data is deleted
        if (result) {
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
