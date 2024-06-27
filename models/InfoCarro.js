import Sequelize from 'sequelize';
import db from './db.js'; // Importe sua configuração de conexão com o banco de dados

const sequelize = db.sequelize;

// Definição do modelo Carro
const InfoCarro = sequelize.define('info_carro', {
    nomeCarro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    placa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    anoFabricacao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    capacidadeTanque: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mediaConsumo: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});


export default InfoCarro;
