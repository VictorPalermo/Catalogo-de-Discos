const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');

const Disco = sequelize.define(
    'Disco',
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ano: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        imagem: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        faixa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        sequelize,
        modelName: 'Disco',
        tableName: 'discos',
        timestamps: true,
    },
);