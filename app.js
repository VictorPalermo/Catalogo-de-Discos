const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));







app.get('/', (req, res) => {
    res.render('index');  
});

app.get('/artista', (req, res) => {
    res.render('artista');  
});

app.get('/disco', (req, res) => {
    res.render('disco');  
});

app.get('/catalogo', (req, res) => {
    res.render('catalogo');  
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
