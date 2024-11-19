'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
 up: async (queryInterface) => {
  await queryInterface.createTable('artistas', {
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

},{
  modelName: 'Artista',
  tableName: 'artistas',
  timestamps: true,
});
},

  down: async (queryInterface) => {
await queryInterface.dropTable('artistas')
  }
};
