import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const agenda = db.sequelize.define('agenda', {

  i_agenda_idSchedule: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  s_agenda_nameSchedule: {
    type: DataTypes.STRING,
    allowNull: false
  },

  d_agenda_startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  
  d_agenda_startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },

  d_agenda_deliverEndDate: {
    type: DataTypes.DATE,
    allowNull: false
  },

  s_agenda_originSelect: {
    type: DataTypes.STRING,
    allowNull: false
  },

  s_agenda_officeStart: {
    type: DataTypes.STRING,
    allowNull: false
  },

  s_agenda_officeEnd: {
    type: DataTypes.STRING,
    allowNull: false
  },

  i_agenda_startRote: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  i_agenda_kmInitial: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  i_agenda_scheduleCar: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  d_agenda_createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  d_agenda_updateAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }}, {
    tableName: 'agenda',
    timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default agenda;
