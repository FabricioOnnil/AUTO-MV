// models/FuelStation.mjs
import { DataTypes } from 'sequelize';
import db from './db.mjs';

const FuelStation = db.sequelize.define('FuelStation', {
  idFuel: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fuelDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fuelPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fuelDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fuelImg: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  idCar: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cars', // Nome da tabela que a chave estrangeira referencia
      key: 'idCar',
    },
  },
  qtdFuel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priceLiter: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
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
  tableName: 'fuelStations',
  timestamps: true, 
});

export default FuelStation;
