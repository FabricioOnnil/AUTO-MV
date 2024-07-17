import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const abastecimento = db.sequelize.define('abastecimento', {
    // Identificador da linha da tabela de abastecimento. 
    i_abastecimento_idFuel: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    //Descrição para o abastecimento.
    s_abastecimento_fuelDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },

    //Valor total do Abastecimento
    dec_abastecimento_fuelPrice:{
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    //Data do Abastecimento
    d_abastecimento_fuelDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    //Imagem da Nota Fiscal
    l_abastecimento_fuellImg: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },

    //Chave Estrangeira do Id do Carro escolhido.
    i_abastecimento_idCar: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Quantidade do abastecimento.
    i_abastecimento_qtdFuel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //Preço do litro do Combustivel.
    dec_abastecimento_priceLiter: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    //Data da criação da linha
    d_abastecimento_createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    //Data de atualização da linha
    d_abastecimento_updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    //Chave estrangeira entre o Usuario e o abastecimento
    i_abastecimento_usuario_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    //Chave estrangeira entre o carro e o abastecimento
    i_abastecimento_carroAbastecimentoKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    //Chave estrangeira entre o agendamento e abastecimento
    i_abastecimento_agendamentoKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    //Chave estrangeira entre visita do usuario e o abastecimento
    i_abastecimento_usuarioVisitKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },},
    {
       tableName: 'abastecimento',
       timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
});

export default abastecimento;