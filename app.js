const express = require('express');
const path = require('path');
const app = express();
const { initialize, sequelize } = require('./dbConfig');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


async function initializeDatabase() {
    try {
        await initialize();
        await sequelize.sync();
        console.log("Muito bom, banco de dados MySql conectado e tabelas sincronizadas com sucesso!")
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
    console.log("Perfeito, servidor rodando na porta:" , PORT);
});
