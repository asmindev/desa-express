const axios = require('axios');

const FormData = require('form-data');
const { PerangkatDesa } = require('../../../database/models');

const Perangkat = async (req, res) => {
    const perangkat = await PerangkatDesa.find();
    res.render('perangkat', {
        title: 'Perangkat Desa', layout: 'layouts/main', perangkat,
    });
};

const addPerangkat = async (req, res) => {
    const { nama, jabatan } = req.body;
    const { file } = req.files
    const fileName = file.name;
    const buffer = await file.data;
    const base64 = buffer.toString('base64');
    const image = `data:${file.mimetype};base64,${base64}`;
    const form = new FormData();
    form.append('file', image);
    form.append('upload_preset', 'desa-konda')
    form.append('cloud_name', 'dph249ste')
    form.append('folder', 'desa-konda/perangkat-desa')
    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dph249ste/image/upload', form, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            },
        });
        // save to database
        const result = response.data
        result.originalName = fileName
        const perangkat = new PerangkatDesa({
            name: nama,
            position: jabatan,
            photo: result,
        });
        await perangkat.save();
        res.render('success', {
            title: 'Success', layout: 'layouts/main', success: 'Data berhasil ditambahkan',
        });
    } catch (error) {
        res.render('success', {
            title: 'Success', layout: 'layouts/main', success: 'Data gagal ditambahkan',
        });
    }
};

module.exports = { Perangkat, addPerangkat };
