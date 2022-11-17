// delete from data
const { PerangkatDesa } = require('../../../../database/models');

const deletePerangkat = async (req, res) => {
    // method post
    if (req.method === 'POST') {
        const { id } = req.body;
        // delete from database
        const result = await PerangkatDesa.findByIdAndDelete(id);
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

        res.redirect('/admin/perangkat-desa');
    } else {
        res.send('Method not allowed');
    }
};

module.exports = {
    deletePerangkat,
};
