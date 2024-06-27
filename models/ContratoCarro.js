import Sequelize from 'sequelize';
import db from './db.js'; // Importe sua configuração de conexão com o banco de dados

const sequelize = db.sequelize;


const ContratoCarro = sequelize.define('contrato_carro', {
    dataInicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dataTermino: {
        type: Sequelize.DATE,
        allowNull: false
    },
    usuarioResponsavel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigoReserva: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigoAluguel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tarifaContrato: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    kmExcedente: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    distanciaDia: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


export default ContratoCarro;