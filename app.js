const express = require('express');
const bodyParser = require('body-parser');
const ejslayout = require('express-ejs-layouts');
const cors = require('cors');
const path = require('path');
require('./database/conn');
const routes = require('./src/routes/index');

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(ejslayout)
app.use(bodyParser.json())
app.use(cors())
// set folder views to src/views
app.set('views', path.join(__dirname, 'src/views'));
// set folder public to src/public
app.use(express.static(path.join(__dirname, 'src/public')));

app.get('/', routes.Home);
app.get('/perangkat-desa', routes.Perangkat);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
