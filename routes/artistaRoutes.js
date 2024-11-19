const express = require('express');
const router = express.Router();
const { criarArtista } = require('../controllers/artistaController');
const Artista = require('../models/artistaModel'); 


router.post('/artista', criarArtista);

router.get('/editar-artista/:id', async (req, res) => {
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

router.post('/editar-artista/:id', async (req, res) => {
    try {
        const { nome, genero } = req.body;
        const artista = await Artista.findByPk(req.params.id);
        if (artista) {
            const generoFormatado = Array.isArray(genero) ? genero.join(',') : genero;
            await artista.update({ nome, genero: generoFormatado });
            res.redirect('/catalogo'); 
        } else {
            res.status(404).send('Artista não encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar artista');
    }
});


module.exports = router;
