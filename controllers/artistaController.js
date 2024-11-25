const Artista = require('../models/artistaModel');

async function criarArtista(req, res) {
    try {
        const { nome, genero, discos } = req.body;

        const generoFormatado = Array.isArray(genero) ? genero.join(',') : genero;
        const discosFormatados = Array.isArray(discos) ? discos.join(',') : discos;

        const novoArtista = await Artista.create({ 
            nome, 
            genero: generoFormatado, 
            discos: discosFormatados 
        });

        res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar artista:', error);
        res.status(500).send('Erro ao criar artista.');
    }
}


async function verArtista(req, res) {
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
};

async function editarArtista(req, res) {
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
};

async function deletarArtista(req, res) {
    try {
        const id = req.params.id; 
        const artista = await Artista.findByPk(id); 

        if (!artista) {
            return res.status(404).send('Artista não encontrado'); 
        }

        await artista.destroy(); 
        res.redirect('/catalogo'); 
    } catch (error) {
        console.error('Erro ao deletar artista:', error);
        res.status(500).send('Erro ao deletar artista');
    }
}

const Disco = require('../models/discoModel');

async function carregarPaginaArtista(req, res) {
    try {
        const discos = await Disco.findAll();
        res.render('artista', { discos }); 
    } catch (error) {
        console.error('Erro ao carregar discos:', error);
        res.status(500).send('Erro ao carregar a página de criação de artista.');
    }
}




module.exports = { criarArtista, editarArtista, verArtista, deletarArtista, carregarPaginaArtista };