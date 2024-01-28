const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const travelRoutes = require('./js/routes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname + '/pages'));

app.get("/", (req, res) => {
    res.sendFile('pages/index.html', { root: './pages' });
});

app.use('/travelagency', travelRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})