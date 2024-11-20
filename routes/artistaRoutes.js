const express = require('express');
const router = express.Router();
const { criarArtista, editarArtista, verArtista, deletarArtista } = require('../controllers/artistaController');
const Artista = require('../models/artistaModel'); 


router.post('/artista', criarArtista);

router.get('/editar-artista/:id', verArtista);

router.post('/editar-artista/:id', editarArtista);

router.post('/deletar-artista/:id', deletarArtista);

module.exports = router;
