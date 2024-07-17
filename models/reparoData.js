
import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const reparo = db.sequelize.define('reparo', {
    //Identificador de linha da tabela reparo. 
    i_reparo_idRepair: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    //Descrição do reparo. 
    s_reparo_description: {
        type: DataTypes.STRING, 
        allowNull: false    
    },

    //Valor do reparo.
    dec_reparo_prideRepair: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    //Data do reparo.
    d_reparo_dateRepair: {
        type: DataTypes.DATE,
        allowNull: false
    },

    // Imagem da Nota Fiscal de reparo.
    l_reparo_imgRepair: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },

    //Data de criação da linha.
    d_reparo_createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    //Data de atualização da linha. 
    d_reparo_updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    i_reparo_usuario_key:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    i_usuarioReparo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
    },

    i_agendamento_agendado_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }},
    {
        tableName: 'reparo',
        timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically

});


export default reparo;