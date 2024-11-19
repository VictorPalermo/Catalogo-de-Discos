const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { criarDisco } = require('../controllers/discoController');
const Disco = require('../models/discoModel'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');  
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});

const upload = multer({ storage: storage });

router.get('/editar-disco/:id', async (req, res) => {
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

router.post('/editar-disco/:id', upload.single('imagem'), async (req, res) => {
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

router.post('/disco', upload.single('imagem'), criarDisco);

module.exports = router;
