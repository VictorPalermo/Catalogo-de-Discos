const { Op } = require('sequelize');
const Disco = require('../models/discoModel'); 
const Artista = require('../models/artistaModel');

async function buscarCatalogo(req, res) {
    const { categoria, titulo, nome, genero } = req.query;

    try {
        let resultados = [];

        if (categoria === 'disco') {
            resultados = await Disco.findAll({
                where: {
                    [Op.and]: [
                        titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : {},
                        genero ? { genero: { [Op.like]: `%${genero}%` } } : {}
                    ]
                }
            });
        } else if (categoria === 'artista') {
            resultados = await Artista.findAll({
                where: {
                    [Op.and]: [
                        nome ? { nome: { [Op.like]: `%${nome}%` } } : {},
                        genero ? { genero: { [Op.like]: `%${genero}%` } } : {}
                    ]
                }
            });
        } else {
            resultados = [
                ...await Disco.findAll(),
                ...await Artista.findAll()
            ];
        }

        res.render('catalogo', { resultados, categoria, titulo, nome, genero });
    } catch (error) {
        console.error('Erro ao buscar catálogo:', error);
        res.status(500).send('Erro ao buscar catálogo.');
    }
}

module.exports = { buscarCatalogo };
