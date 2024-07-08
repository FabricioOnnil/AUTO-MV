import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js'; // Importe sua configuração de conexão com o banco de dados

const sequelize = db.sequelize;

// Definição do modelo Carro
const carro = sequelize.define('carro', {
    i_carro_idcar: {
        typ:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    s_carro_model: {
        type: DataTypes.STRING,
        allowNull: false
    },

    s_carro_plate: {
        type: DataTypes.STRING,
        allowNull: false
    },

    s_carro_manufactureYear: {
        type: DataTypes.STRING,
        allowNull: false
    },

    i_carro_fuelTank: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    i_carro_consumptionAverage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    d_carro_startDateRental: {
        type: DataTypes.DATE,
        allowNull: false
    },

    s_carro_responsible: {
        type: DataTypes.STRING,
        allowNull: false
    },

    s_carro_reservationCode: {
        type: DataTypes.STRING,
        allowNull: false
    },

    s_carro_contractRental: {
        type: DataTypes.STRING,
        allowNull: false
    },

    i_carro_rateMonthly: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    i_carro_restKm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    i_carro_franchiseKm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    i_carro_repairLimitValue: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    i_carro_damageOther: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    i_carro_totalLoss: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    d_carro_startDateSafe:{
        type: DataTypes.DATE,
        allowNull: false
    },

    d_carro_endDateSafe: {
        type: DataTypes.DATE,
        allowNull: false
    },

    i_carro_rentalKm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    d_carro_createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    d_carro_updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    }, {
        tableName: 'carro',
        timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
    });


export default carro;
