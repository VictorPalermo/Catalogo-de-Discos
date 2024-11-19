const Disco = require('../models/discoModel');

async function criarDisco(req, res) {
    try {
        const { id, titulo, ano, imagem, faixa } = req.body; 
        const novoDisco = await Disco.create({id, titulo, ano, imagem, faixa });
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar disco:', error);
        res.status(500).send('Erro ao criar disco.');
    }
}

module.exports = { criarDisco };
