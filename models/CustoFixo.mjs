// ContratoCarro.js

import Sequelize from 'sequelize';
import db from './db.mjs';

const sequelize = db.sequelize;

// Definindo o modelo CustosFixos
const CustosFixos = sequelize.define('custos_fixos', {
    damageLimit: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    otherDamage: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    totalLoss: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    insurancePeriod: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    quilometragemInicial: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});



export default CustosFixos;
