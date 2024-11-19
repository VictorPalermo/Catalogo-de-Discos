const Disco = require('../models/discoModel');
const path = require('path');

async function criarDisco(req, res) {
    try {
        if (!req.file) {
            return res.status(400).send('A imagem do disco é obrigatória');
        }
        const { titulo, ano, faixa, genero } = req.body;
        const imagem = '/uploads/' + req.file.filename; 
        const generoFormatado = Array.isArray(genero) ? genero.join(',') : genero;


        const novoDisco = await Disco.create({ titulo, ano, imagem, faixa, genero:generoFormatado });

        res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar disco:', error);
        res.status(500).send('Erro ao criar disco.');
    }
}

module.exports = { criarDisco };
