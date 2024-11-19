const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const artistaRoutes = require('./routes/artistaRoutes');
const discoRoutes = require('./routes/discoRoutes');
const catalogoRoutes = require('./routes/catalogoRoutes');
const { initialize, sequelize } = require('./dbConfig');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads')); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'))); 

app.use(artistaRoutes);
app.use(discoRoutes);
app.use(catalogoRoutes);

app.get('/editar-disco/:id', async (req, res) => {
    try {
        const disco = await Disco.findByPk(req.params.id);
        if (disco) {
            res.render('editarDisco', { disco });
        } else {
            res.status(404).send('Disco não encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar disco');
    }
});

app.post('/editar-disco/:id', upload.single('imagem'), async (req, res) => {
    try {
        const { titulo, ano, faixa } = req.body;
        const disco = await Disco.findByPk(req.params.id);
        if (disco) {
            await disco.update({ 
                titulo, 
                ano, 
                faixa, 
                imagem: req.file ? '/uploads/' + req.file.filename : disco.imagem 
            });
            res.redirect('/');  
        } else {
            res.status(404).send('Disco não encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar disco');
    }
});

app.get('/editar-artista/:id', async (req, res) => {
    try {
        const artista = await Artista.findByPk(req.params.id);
        if (artista) {
            res.render('editarArtista', { artista });
        } else {
            res.status(404).send('Artista não encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar artista');
    }
});

app.post('/editar-artista/:id', async (req, res) => {
    try {
        const { nome, genero } = req.body;
        const artista = await Artista.findByPk(req.params.id);
        if (artista) {
            await artista.update({ nome, genero });
            res.redirect('/');  
        } else {
            res.status(404).send('Artista não encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar artista');
    }
});

async function initializeDatabase() {
    try {
        await initialize();
        await sequelize.sync();
        console.log("Banco Mysql conectado");
    } catch (error) {
        console.error('Erro ao iniciar a conexão com o banco de dados:', error);
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

app.post('/disco', upload.single('imagem'), async (req, res) => {
    try {
        const { titulo, ano, faixa } = req.body;
        const imagem = req.file ? '/uploads/' + req.file.filename : null; 

        const novoDisco = await Disco.create({ titulo, ano, imagem, faixa });

        res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar disco:', error);
        res.status(500).send('Erro ao criar disco.');
    }
});

const PORT = 3000;
app.listen(PORT, async () => {
    await initializeDatabase();
    console.log("Servidor rodando na porta:", PORT);
});
