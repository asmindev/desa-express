// login with email or username and password with express session
const bcrypt = require('bcryptjs');
const { User } = require('../../../../database/models');

const loginAuth = async (req, res) => {
    if (req.method === 'GET') {
        res.render('admin/auth/login', {
            title: 'Login Admin Page', layout: 'layouts/main', msg: req.flash('msg'),
        });
    } else if (req.method === 'POST') {
        const { username, password } = req.body;
        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
            const msg = { type: 'danger', msg: 'Username dan Password Tidak cocok' };
            req.flash('msg', msg);
            res.redirect('/auth/login');
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                const msg = { type: 'danger', msg: 'Username dan Password Tidak cocok' };
                req.flash('msg', msg);
                res.redirect('/auth/login');
            } else {
                req.session.user = user;
                req.session.isLoggedIn = true;
                req.session.save((err) => {
                    if (err) {
                        res.redirect('/auth/login');
                    }
                    res.redirect('/admin');
                });
            }
        }
    }
};
module.exports = { loginAuth };
