const { User } = require('../../../../database/models');

const verify = async (req, res) => {
    if (req.method === 'GET') {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { active: true });
        console.log(user);
        const { name } = user;
        res.render('admin/auth/verify', {
            title: 'Verifikasi',
            layout: 'layouts/main',
            name,
        });
    } else {
        res.json({ message: 'Method not allowed' });
    }
}
module.exports = { verify };
