'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
 up: async (queryInterface) => {
  await queryInterface.createTable('discos', {
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
},{
  modelName: 'Disco',
  tableName: 'discos',
  timestamps: true,
});
},

  down: async (queryInterface) => {
await queryInterface.dropTable('discos')
  }
};
