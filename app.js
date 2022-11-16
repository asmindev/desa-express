const express = require('express');
const bodyParser = require('body-parser');
const ejslayout = require('express-ejs-layouts');
const cors = require('cors');
const session = require('express-session');
const fileUpload = require('express-fileupload');
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

app.use(ejslayout)
app.use(bodyParser.json())
app.use(cors())
// set folder views to src/views
app.set('views', path.join(__dirname, 'src/views'));
// set folder public to src/public
app.use(express.static(path.join(__dirname, 'src/public')));

app.get('/', routes.Home);
app.get('/perangkat-desa', routes.Perangkat);
app.post('/perangkat-desa', routes.addPerangkat);
app.get('/administrasi-desa', routes.Administrasi);
app.get('/tentang-desa', routes.tentangDesa);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
