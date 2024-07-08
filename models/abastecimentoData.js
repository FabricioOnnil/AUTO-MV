import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const abastecimento = db.sequelize.define('abastecimento', {
    
    i_abastecimento_idFuel: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    s_abastecimento_fuelDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dec_abastecimento_fuelPrice:{
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    d_abastecimento_fuelDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    l_abastecimento_fuellImg: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },

    i_abastecimento_idCar: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    i_abastecimento_qtdFuel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    dec_abastecimento_priceLiter: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    d_abastecimento_createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    d_abastecimento_updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },},
    {
       tableName: 'abastecimento',
       timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
})


export default abastecimento;