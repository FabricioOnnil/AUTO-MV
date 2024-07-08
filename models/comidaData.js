// models/Food.mjs
import { DataTypes } from 'sequelize';
import db from './db.js';

const comida = db.sequelize.define('comida', {
  i_comida_idFood: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  s_comida_descriptionFood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  s_comida_valueFood: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
  },
  d_comida_dateFood: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  l_comida_imgFood: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  d_comida_createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
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
