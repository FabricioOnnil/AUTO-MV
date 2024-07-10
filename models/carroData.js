import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js'; // Importe sua configuração de conexão com o banco de dados

const sequelize = db.sequelize;

// Definição do modelo carro
const carro = sequelize.define('carro', {
    // id da tabela.
    i_carro_idcar: {
        typ:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    //Modelo do carro.
    s_carro_model: {
        type: DataTypes.STRING,
        allowNull: false
    },

    //Placa do carro.
    s_carro_plate: {
        type: DataTypes.STRING,
        allowNull: false
    },

    //Ano de fabricação.
    s_carro_manufactureYear: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // capacidade do Tanque de combustivel
    i_carro_fuelTank: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //média de consumo
    i_carro_consumptionAverage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Data de inicio do aluguel
    d_carro_startDateRental: {
        type: DataTypes.DATE,
        allowNull: false
    },

    //Responsável pelo aluguel do carro.
    s_carro_responsible: {
        type: DataTypes.STRING,
        allowNull: false
    },

    //Codigo de reserva do carro. 
    s_carro_reservationCode: {
        type: DataTypes.STRING,
        allowNull: false
    },

    //Contrato por aluguel
    s_carro_contractRental: {
        type: DataTypes.STRING,
        allowNull: false
    },

    //Taxa mensal do carro.
    i_carro_rateMonthly: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //valor por quilometragem excedente.
    i_carro_restKm: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    //Franquia de quilometragem atendida.
    i_carro_franchiseKm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Valor limite para reparo
    i_carro_repairLimitValue: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    //Danos a outros carros.
    i_carro_damageOther: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    //Perda Total do Carro.
    i_carro_totalLoss: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    //Daa de inicio do aluguel.
    d_carro_startDateSafe:{
        type: DataTypes.DATE,
        allowNull: false
    },

    //Data do fim do aluguel.
    d_carro_endDateSafe: {
        type: DataTypes.DATE,
        allowNull: false
    },

    //Quilomentragem do inicio do aluguel.
    i_carro_rentalKm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Data de criação.
    d_carro_createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    //Data da ultima atualização.
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
