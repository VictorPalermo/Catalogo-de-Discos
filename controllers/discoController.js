const Disco = require('../models/discoModel');
const path = require('path');

async function criarDisco(req, res) {
    try {
        if (!req.file) {
            return res.status(400).send('A imagem do disco é obrigatória');
        }
        const { titulo, ano, faixa } = req.body;
        const imagem = '/uploads/' + req.file.filename; 

        const novoDisco = await Disco.create({ titulo, ano, imagem, faixa });

        res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar disco:', error);
        res.status(500).send('Erro ao criar disco.');
    }
}

module.exports = { criarDisco };
