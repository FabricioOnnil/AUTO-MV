import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const entrega = db.sequelize.define('entrega', {

    // Identificador da tabela entrega. 1 
    i_entrega_idDelivery: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    //Nome do responsável pela entrega. 2
    s_entrega_nomeDelivery: {
        type: DataTypes.STRING,
        allowNull: true
    },

    //Data da entrega. 3
    d_entrega_deliveryEndDate: {
        type: DataTypes.DATE,
        allowNull: true
    },

    //Hora da Entrega. 4
    d_entrega_deliveryEndTime: {
        type: DataTypes.TIME,
        allowNull: true
    },

    //Escritorio da Entrega. 5
    s_entrega_destinySelect: {
        type: DataTypes.STRING,
        allowNull: true
    },

    //Quilometragem Final. 6
    i_entrega_kmFinal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    //Carro entregue. 7
    i_entrega_deliveryCar: {
       type: DataTypes.INTEGER,
        allowNull: true
    },

    //Data da criação da linha. 8
    d_entrega_createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },

     //Data da atualização da linha. 9
     d_entrega_updateAt: {
       type: DataTypes.DATE,
       allowNull: true,
       defaultValue: DataTypes.NOW,
     },

     //Referencia externa do agendamento. 10 
     i_entrega_agendamento: {
        type: DataTypes.INTEGER
     }
    }, {
        tableName: 'entrega',
        timestamps: false, // This is true by default and manages `createdAt` and `updatedAt` automatically
    });

export default entrega;