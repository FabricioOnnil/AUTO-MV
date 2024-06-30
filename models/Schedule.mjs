import { Sequelize, DataTypes } from 'sequelize';
import db from './db.mjs';

const Schedule = db.sequelize.define('schedule', {
  nameSchedule: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  scheduleStartDate: {
    type: db.Sequelize.DATE,
    allowNull: false
  },
  startTime: {
    type: db.Sequelize.TIME,
    allowNull: false
  },
  originSelect: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  startRote: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  km_initial: {
    type: db.Sequelize.INTEGER,
    allowNull: false
  },
  scheduleCar: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
});

export default Schedule;
