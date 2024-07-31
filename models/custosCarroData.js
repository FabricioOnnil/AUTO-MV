import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js'; // Importe sua configuração de conexão com o banco de dados

const sequelize = db.sequelize;

// Definição de custos do carro
const custosCarro = sequelize.define('custosCarro', {
    // id da tabela de custos. 1
    i_custosCarro_custosId: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 

    // custo de limite para reparos
    dec_custosCarro_repairLimitValue: {
        type:DataTypes.DECIMAL,
        allowNull: false
    },

    // Limite de custo para reparos de terceiros.
    dec_custosCarro_damageOther: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    // Custo maximo de perda Total.
    dec_custosCarro_totalLoss: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    // Data do inicio do contrato.
    d_custosCarro_starDateSafe: {
        type: DataTypes.DATE,
        allowNull: false
    },

    // Data do fim do contrato.
    d_custosCarro_endDateSafe: {
        type:DataTypes.DATE,
        allowNull: false
    },

    // Quilometragem de aluguel.
    i_carro_rentalKm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    // Data de criação da Linha
    d_custosCarro_createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

    // Data de atualização da Linha.
    d_custosCarro_updateAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, 
{
tableName: 'custosCarro',
timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default custosCarro;