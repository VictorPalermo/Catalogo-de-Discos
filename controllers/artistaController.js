const Artista = require('../models/artistaModel');

async function criarArtista(req, res) {
    try {
        const { id, nome, genero, discos } = req.body; 
        const novoArtista = await Artista.create({id, nome, genero, discos });
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar artista:', error);
        res.status(500).send('Erro ao criar artista.');
    }
}

module.exports = { criarArtista };
