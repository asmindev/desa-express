const mongoose = require('mongoose');
const {
    Desa,
} = require('../../../database/models');
require('dotenv').config();

const Home = async (req, res) => {
    let editable;
    const idDesa = process.env.DESA_ID;
    const desa = await Desa.findById(idDesa.trim());
    if (req.method === 'GET') {
        const { edit } = req.query;
        const msg = req.flash('msg')
        if (edit) {
            const available = {
                1: 'name',
                2: 'location',
                3: 'population',
                4: 'vision',
                5: 'mission',
                6: 'openingSpech',
            };
            const data = available[edit];
            if (data) {
                editable = await desa[data];
                if (editable) {
                    editable = {
                        parent_id: desa._id.toHexString(),
                        data: editable,
                        field: data,
                    }

                    res.render('admin/home', {
                        title: 'Admin Page', layout: 'layouts/main', editable, msg,
                    });
                }
            } else {
                res.render('admin/home', {
                    title: 'Admin Page', layout: 'layouts/main', desa, editable, msg,
                });
            }
        } else {
            console.log('masuk sini', msg);
            res.render('admin/home', {
                title: 'Admin Page', layout: 'layouts/main', desa, editable, msg,
            });
        }
    } else if (req.method === 'POST') {
        let pesan;
        const { id, editable: msg, field } = req.body;
        console.log(req.body)
        const _id = mongoose.Types.ObjectId(id.trim());
        const result = await Desa.updateOne({ _id }, { [field]: msg });
        if (result.matchedCount === 1) {
            pesan = {
                type: 'success',
                msg: 'Data berhasil diubah',
            }
        } else {
            pesan = {
                type: 'danger',
                msg: 'Data gagal diubah',
            }
        }
        req.flash('msg', pesan);
        res.redirect('/admin');
        // res.render('admin/home', {
        //     title: 'Admin Page', layout: 'layouts/main', desa: desas, editable: msg, msg: pesan,
        // });
    }
};

module.exports = { Home };
