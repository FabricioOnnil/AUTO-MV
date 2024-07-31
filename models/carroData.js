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

    i_carro_carroAbastecimento: {
        type: DataTypes.INTEGER,
        allowNull: true,

    },
    }, {
        tableName: 'carro',
        timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
    });


export default carro;
