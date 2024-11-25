const { Sequelize } = require('sequelize');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'catalogo',
    dialect: 'mysql'
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});

async function initialize() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco MySQL foi estabelecida');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
        throw error;
    }
}

async function close() {
    try {
        await sequelize.close();
        console.log('Conexão com o banco de dados MySQL fechada com sucesso.');
    } catch (error) {
        console.error('Erro ao fechar a conexão com o banco de dados:', error);
    }
}

module.exports = {
    sequelize,
    initialize,
    close
};

