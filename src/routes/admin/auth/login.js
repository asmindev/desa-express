// login with email or username and password with express session
const bcrypt = require('bcryptjs');
// nodemailer
const { sendEmailVerification } = require('./emailSend');
const { User } = require('../../../../database/models');

const loginAuth = async (req, res) => {
    if (req.method === 'GET') {
        const msg = req.flash('msg');
        console.log(msg[0]);
        if (msg[0]?.msg.toLowerCase() === 'register berhasil' && msg[0]?.email) {
            const user = await User.findOne({ email: msg[0].email });
            const { email, _id } = user;
            const host = req.get('host');
            const { protocol } = req;
            const link = `${protocol}://${host}/auth/verify/${_id}`;
            await sendEmailVerification(email, _id, link);
            const msg2 = [{ type: 'success', msg: 'Silahkan cek email untuk verifikasi akun. jika tidak ada di primary cek di folder spam' }];
            res.render('admin/auth/login', {
                title: 'Login Admin Page', layout: 'layouts/main', msg: msg2,
            });
        }
        console.log(msg);
        res.render('admin/auth/login', {
            title: 'Login Admin Pages', layout: 'layouts/main', msg,
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
            } else if (user.active) {
                req.session.user = user;
                req.session.isLoggedIn = true;
                req.session.save(async (err) => {
                    if (err) {
                        const msg = { type: 'danger', msg: 'Terjadi Kesalahan' };
                        req.flash('msg', msg);
                        res.redirect('/auth/login');
                    }
                });
                res.redirect('/admin');
            } else {
                const host = req.get('host');
                const { protocol } = req;
                const link = `${protocol}://${host}/auth/verify/${user._id}`;
                await sendEmailVerification(user.email, user._id, link);
                const msg = { type: 'danger', msg: 'Akun belum diverifikasi, Silahkan cek email anda, jika tidak ada, silahkan cek di folder spam' };
                req.flash('msg', msg);
                res.redirect('/auth/login');
            }
        }
    }
};
module.exports = { loginAuth };
