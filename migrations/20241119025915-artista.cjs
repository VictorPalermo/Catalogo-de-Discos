'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
 up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('artistas', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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
  timestamps: false,
});
},

  down: async (queryInterface) => {
await queryInterface.dropTable('artistas')
  }
};
