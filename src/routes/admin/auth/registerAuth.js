const bcrypt = require('bcryptjs');
const { User } = require('../../../../database/models');

const registerAuth = async (req, res) => {
    if (req.method === 'GET') {
        res.render('admin/auth/register', {
            title: 'Register Admin Page', layout: 'layouts/main', msg: req.flash('msg'),
        });
    } else if (req.method === 'POST') {
        const {
            name, username, email, password,
        } = req.body;
        const user = await User
            .findOne({ $or: [{ email }, { username }] });
        if (user) {
            const msg = { type: 'danger', msg: 'Tidak bisa menggunakan username atau email ini' };
            req.flash('msg', msg);
            res.redirect('/auth/register');
        } else {
            const hash = await bcrypt.hash(password, 12);
            // find role, if role is admin, reject to register
            const role = await User.findOne({ role: 'admin' });
            if (role) {
                const msg = { type: 'danger', msg: 'Admin telah ada' };
                req.flash('msg', msg);
                res.redirect('/auth/register');
            } else {
                const newUser = new User({
                    name,
                    username,
                    email,
                    password: hash,
                    role: 'admin',
                });
                await newUser.save();
                const msg = { type: 'success', msg: 'Register Berhasil' };
                req.flash('msg', msg);
                res.redirect('/auth/login');
            }
        }
    }
};

module.exports = { registerAuth };
