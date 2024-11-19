const Artista = require('../models/artistaModel');

async function criarArtista(req, res) {
    try {
        const { nome, genero, discos } = req.body; 

        const generoFormatado = Array.isArray(genero) ? genero.join(',') : genero;

        const novoArtista = await Artista.create({ nome, genero: generoFormatado, discos });
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar artista:', error);
        res.status(500).send('Erro ao criar artista.');
    }
}


module.exports = { criarArtista };
