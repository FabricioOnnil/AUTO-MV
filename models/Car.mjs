// models/Car.mjs
import { DataTypes } from 'sequelize';
import db from './db.mjs';

const Car = db.sequelize.define('Car', {
  id_car: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  manufactureYear: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fuelTank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  consumptionAverage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startDateRental: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDateRental: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  responsible: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reservationCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contractRental: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rateMonthly: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  restKm: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  franchisekm: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  repairLimitValue: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  damageOther: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalLoss: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  startDateSafe: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDateSafe: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rentalkm: {
    type: DataTypes.INTEGER,
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
  tableName: 'cars',
  timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default Car;
