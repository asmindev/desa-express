const { AdministrasiDesa } = require('../../../../database/models');

const addAdministrasi = async (req, res) => {
    if (req.method === 'GET') {
        const administrasi = await AdministrasiDesa.find();
        res.render('admin/administrasi/addAdministrasi', {
            title: 'Potensi Desa', layout: 'layouts/main', administrasi,

        });
    } else {
        try {
            const { name } = req.body
            const dynamicField = { ...req.body }
            delete dynamicField.name
            // object value to array

            const dynamicFieldArray = Object.values(dynamicField)
            const create = await AdministrasiDesa.create({
                name,
                fields: dynamicFieldArray,
            })
            create.save()
            const msg = {
                type: 'success',
                msg: 'Data berhasil ditambahkan',
            }
            req.flash('msg', msg);
            res.redirect('/admin/administrasi-desa');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {
    addAdministrasi,
};
