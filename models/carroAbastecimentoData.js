import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const carroAbastecimento = db.sequelize.define('carroAbastecimento', { 
    //Identificador de linha da tabela de carroAbastecimento.
    i_carroAbastecimento_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    i_carroAbastecimento_abastecimento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    //Data de criação da linha.
    i_carroAbastecimento_carro: {
        type: DataTypes.DATE,
        allowNull: false,
        
    },
});

export default carroAbastecimento;