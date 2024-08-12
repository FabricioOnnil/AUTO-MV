import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const usuarioVisita = db.sequelize.define('usuarioVisita', { 
    //Identificador de linha da tabela de usuarioVisita.
    i_usuarioVisita_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    i_usuarioVisita_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    //Data de criação da linha.
    d_usuarioVisita_createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },

    //Data de atualização da linha. 
    d_usuarioVisita_updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
},{
    tableName: 'usuarioVisita',
    timestamps: false, // This is true by default and manages `createdAt` and `updatedAt` automatically);

});

export default usuarioVisita;