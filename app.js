const express = require('express');
const bodyParser = require('body-parser');
const ejslayout = require('express-ejs-layouts');
const cors = require('cors');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
require('dotenv').config();

const path = require('path');
require('./database/conn');
const routes = require('./src/routes/index');

const app = express();
const store = new session.MemoryStore();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}));
app.use(fileUpload());
app.use(express.urlencoded({
    extended: true,
}));

app.use(flash());
app.use(cookieParser('secret'));
app.use(ejslayout)
app.use(bodyParser.json())
app.use(cors())
// set folder views to src/views
app.set('views', path.join(__dirname, 'src/views'));
// set folder public to src/public
app.use(express.static(path.join(__dirname, 'src/public')));

app.set('view engine', 'ejs');
app.get('/', routes.Home);
app.get('/perangkat-desa', routes.Perangkat);
app.post('/perangkat-desa', routes.addPerangkat);
app.get('/administrasi-desa', routes.Administrasi);
app.get('/tentang-desa', routes.tentangDesa);
app.get('/potensi-desa', routes.potensiDesa);
app.get('/kegiatan-desa', routes.kegiatanDesa);

// admin login routes
app.get('/auth/login', routes.loginAuth);
app.post('/auth/login', routes.loginAuth);

app.get('/auth/verify/:id', routes.verify)
// auth register routes
app.get('/auth/register', routes.registerAuth);
app.post('/auth/register', routes.registerAuth);
app.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});
const checkSession = (req, res, next) => {
    if (req.session.user && req.session.isLoggedIn) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};
// check session in every request to admin routes
app.use('/admin', checkSession);

// admin routes
app.get('/admin', routes.AdminHome);
app.post('/admin', routes.AdminHome);

// admin kegiatan routes
app.get('/admin/kegiatan-desa', routes.adminKegiatan);
app.get('/admin/kegiatan-desa/add', routes.addKegiatan);
app.post('/admin/kegiatan-desa/add', routes.addKegiatan);
app.get('/admin/kegiatan-desa/:id/edit', routes.editKegiatan);
app.post('/admin/kegiatan-desa/:id/edit', routes.editKegiatan);
app.post('/admin/kegiatan-desa/:id/delete', routes.deleteKegiatan);

// admin potensi routes
app.get('/admin/potensi-desa', routes.adminPotensi);
app.get('/admin/potensi-desa/:id/edit', routes.editPotensi);
app.post('/admin/potensi-desa/:id/edit', routes.editPotensi);
app.post('/admin/potensi-desa/:id/delete', routes.deletePotensi);
app.get('/admin/potensi-desa/add', routes.addPotensi);
app.post('/admin/potensi-desa/add', routes.addPotensi);

// admin perangkat routes
app.get('/admin/perangkat-desa', routes.adminPerangkat);
app.get('/admin/perangkat-desa/:id/edit', routes.editPerangkat);
app.post('/admin/perangkat-desa/:id/edit', routes.editPerangkat);
app.post('/admin/perangkat-desa/:id/delete', routes.deletePerangkat);
app.get('/admin/perangkat-desa/add', routes.addPerangkat);
app.post('/admin/perangkat-desa/add', routes.addPerangkat);

// admin administrasi routes
app.get('/admin/administrasi-desa', routes.adminAdministrasi);
app.get('/admin/administrasi-desa/:id/edit', routes.editAdministrasi);
app.post('/admin/administrasi-desa/:id/edit', routes.editAdministrasi);
app.post('/admin/administrasi-desa/:id/delete', routes.deleteAdministrasi);
app.get('/admin/administrasi-desa/add', routes.addAdministrasi);
app.post('/admin/administrasi-desa/add', routes.addAdministrasi);

// admin tentang desa routes
// app.get('/admin/tentang-desa', routes.tentangDesaAdmin);
// 404 page not found
app.use(routes.notFound);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
