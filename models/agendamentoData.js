import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const agendamento = db.sequelize.define('agendamento', {
    //Identificador da tabela agendamento.
    i_agendamento_agendado_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    //chave para usuario dentro do agendamento.
    i_agendamento_usuarioKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    //chave do carro no agendamento.
    i_agendamento_carroKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
},{
    tableName: 'agendamento',
    timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
    
    });

export default agendamento;