const nodemailer = require('nodemailer');

const sendEmailVerification = async (email, id, host) => {
    const transporter = nodemailer.createTransport({
        host: 'send.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
            user: 'api',
            pass: '32d737622534604ff3e079fb8ba1a41d',
        },
    });
    const mailOptions = {
        from: '"Admin" <mailtrap@konda-satu.my.id>',
        to: email,
        subject: 'Verifikasi Akun',
        html: `<h1>Verifikasi Akun Anda</h1>
        <p>Silahkan Klik Link dibawah untuk verifikasi akun anda</p>
        <a href="${host}">Verifikasi</a>`,
    };

    const send = await transporter.sendMail(mailOptions);
    if (send) {
        return true;
    }
    return false;
}
module.exports = { sendEmailVerification };
