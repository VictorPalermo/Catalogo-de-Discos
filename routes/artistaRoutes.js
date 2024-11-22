const express = require('express');
const router = express.Router();
const { criarArtista, editarArtista, verArtista, deletarArtista, carregarPaginaArtista } = require('../controllers/artistaController');
const Artista = require('../models/artistaModel'); 


router.get('/artista', carregarPaginaArtista);


router.post('/artista', criarArtista);

router.get('/editar-artista/:id', verArtista);

router.post('/editar-artista/:id', editarArtista);

router.post('/deletar-artista/:id', deletarArtista);

module.exports = router;
