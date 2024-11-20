const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { criarDisco, editarDisco, verDisco, deletarDisco } = require('../controllers/discoController');
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

router.get('/editar-disco/:id', verDisco);

router.post('/editar-disco/:id', upload.single('imagem'), editarDisco );

router.post('/deletar-disco/:id', deletarDisco);

router.post('/disco', upload.single('imagem'), criarDisco);

module.exports = router;
