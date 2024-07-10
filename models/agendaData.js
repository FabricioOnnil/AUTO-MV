import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const agenda = db.sequelize.define('agenda', {
  //Identificador da tabela agenda.
  i_agenda_idSchedule: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  //Nome responsavel pelo agendamento.
  s_agenda_nameSchedule: {
    type: DataTypes.STRING,
    allowNull: false
  },

  //Data inicial do agendamento.
  d_agenda_startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  
  //Hora planejada do agendamento.
  d_agenda_startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },

  //Data planejada de Entrega. 
  d_agenda_deliverEndDate: {
    type: DataTypes.DATE,
    allowNull: false
  },

  //Escritório de retirada do carro.
  s_agenda_originSelect: {
    type: DataTypes.STRING,
    allowNull: false
  },

  //Escritorio de inicio
  s_agenda_officeStart: {
    type: DataTypes.STRING,
    allowNull: false
  },

  //Escritorio da entrega.
  s_agenda_officeEnd: {
    type: DataTypes.STRING,
    allowNull: false
  },

  //Descrição da Rota.
  i_agenda_startRote: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // Quilometragem inicial do carro. 
  i_agenda_kmInitial: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  //Carro Selecionado. 
  i_agenda_scheduleCar: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  //Data da criação da linha. 
  d_agenda_createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  //Data da atualização da linha. 
  d_agenda_updateAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }}, {
    tableName: 'agenda',
    timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default agenda;
