const { AdministrasiDesa } = require('../../../../database/models');

const editAdministrasi = async (req, res) => {
    if (req.method === 'GET') {
        // get params from url
        const { id } = req.params;
        const administrasi = await AdministrasiDesa.findById(id);
        res.render('admin/administrasi/editAdministrasi', {
            title: 'Administrasi Desa', layout: 'layouts/main', administrasi,

        });
    } else {
        try {
            const { name, id } = req.body;
            const dynamicField = { ...req.body }
            delete dynamicField.name;
            delete dynamicField.id;
            const dynamicFieldArray = Object.values(dynamicField);
            await AdministrasiDesa.findByIdAndUpdate(id, {
                name,
                fields: dynamicFieldArray,
            });
            const msg = {
                type: 'success',
                msg: 'Data berhasil diubah',
            }
            req.flash('msg', msg);
            res.redirect('/admin/administrasi-desa');
        } catch (error) {
            req.flash('msg', {
                type: 'danger',
                msg: 'Data gagal diubah',
            });
            res.redirect('/admin/administrasi-desa');
        }
    }
};

module.exports = {
    editAdministrasi,
};
