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
            const artistas = await Artista.findAll({
                where: {
                    [Op.and]: [
                        nome ? { nome: { [Op.like]: `%${nome}%` } } : {},
                        genero ? { genero: { [Op.like]: `%${genero}%` } } : {}
                    ]
                }
            });

            const discos = await Disco.findAll();
            const mapaDiscos = discos.reduce((mapa, disco) => {
                mapa[disco.id] = disco.titulo;
                return mapa;
            }, {});

            resultados = artistas.map(artista => {
                const idsDiscos = artista.discos.split(',');
                const titulosDiscos = idsDiscos.map(id => mapaDiscos[id] || 'Nenhum');
                return {
                    ...artista.toJSON(),
                    discos: titulosDiscos.join(', ')
                };
            });
        } else {
            const discos = await Disco.findAll();
            const artistas = await Artista.findAll();
            const mapaDiscos = discos.reduce((mapa, disco) => {
                mapa[disco.id] = disco.titulo;
                return mapa;
            }, {});

            const artistasFormatados = artistas.map(artista => {
                const idsDiscos = artista.discos.split(',');
                const titulosDiscos = idsDiscos.map(id => mapaDiscos[id] || 'Nenhum');
                return {
                    ...artista.toJSON(),
                    discos: titulosDiscos.join(', ')
                };
            });

            resultados = [...discos, ...artistasFormatados];
        }

        res.render('catalogo', { resultados, categoria, titulo, nome, genero });
    } catch (error) {
        console.error('Erro ao buscar catálogo:', error);
        res.status(500).send('Erro ao buscar catálogo.');
    }
}






module.exports = { buscarCatalogo};
