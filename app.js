const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const artistaRoutes = require ('./routes/artistaRoutes')
const discoRoutes = require ('./routes/discoRoutes')
const { initialize, sequelize } = require('./dbConfig');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(artistaRoutes);
app.use(discoRoutes);






async function initializeDatabase() {
    try {
        await initialize();
        await sequelize.sync();
        console.log("Banco Mysql conectado")
    } catch (error){
        console.error('Erro ao iniciar a conexão com o banco de dados,' , error);
        process.exit(1);
    }
}

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
app.listen(PORT, async () =>{
    await initializeDatabase();
    console.log("Servidor rodando na porta:" , PORT);
});
