// models/Food.mjs
import { DataTypes } from 'sequelize';
import db from './db.mjs';

const Food = db.sequelize.define('Food', {
  idFood: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descriptionFood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valueFood: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  dateFood: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  imgFood: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'foods',
  timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default Food;
