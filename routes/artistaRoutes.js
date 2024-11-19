const express = require('express');
const router = express.Router();
const { criarArtista } = require('../controllers/artistaController');

router.post('/artista', criarArtista);

module.exports = router;
