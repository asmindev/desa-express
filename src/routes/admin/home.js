const mongoose = require('mongoose');
const {
    Desa,
} = require('../../../database/models');
require('dotenv').config();

const Home = async (req, res) => {
    let editable;
    const name = process.env.DESA_ID;
    const desa = await Desa.findById(name.trim());
    if (req.method === 'GET') {
        const { edit } = req.query;
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
                        title: 'Admin Page', layout: 'layouts/main', editable, msg: null,
                    });
                }
            } else {
                res.render('admin/home', {
                    title: 'Admin Page', layout: 'layouts/main', desa, editable, msg: null,
                });
            }
        } else {
            res.render('admin/home', {
                title: 'Admin Page', layout: 'layouts/main', desa, editable, msg: null,
            });
        }
    } else if (req.method === 'POST') {
        let pesan;
        const { id, editable: msg, field } = req.body;
        console.log(req.body)
        const _id = mongoose.Types.ObjectId(id.trim());
        const result = await Desa.updateOne({ _id }, { [field]: msg });
        const desas = await Desa.findById(name.trim());
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
        res.render('admin/home', {
            title: 'Admin Page', layout: 'layouts/main', desa: desas, editable: null, msg: pesan,
        });
    }
};

module.exports = { Home };
