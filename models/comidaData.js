// models/Food.mjs
import { DataTypes } from 'sequelize';
import db from './db.js';

const comida = db.sequelize.define('comida', {
  //Identificador da linha da tabela comida.
  i_comida_idFood: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  //Descrição da compra de comida.
  s_comida_descriptionFood: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  //Valor da refeição. 
  s_comida_valueFood: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
  },

  //Data da compra da refeição.
  d_comida_dateFood: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  //Imagem da Nota Fiscal
  l_comida_imgFood: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },

  //Data da criação da linha. 
  d_comida_createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  //Data da atualização da linha. 
  d_comida_updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
    tableName: 'comida',
    timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default comida;