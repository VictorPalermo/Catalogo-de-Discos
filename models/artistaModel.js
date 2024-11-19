const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');

const Artista = sequelize.define(
    'Artista',
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        discos: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        sequelize,
        modelName: 'Artista',
        tableName: 'artista',
        timestamps: true,
    },
);