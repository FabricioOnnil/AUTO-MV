import Sequelize from 'sequelize';
import db from './db.mjs';

const sequelize = db.sequelize;

const Acesso = sequelize.define('acesso', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull: false

    },
    password:{
        type:Sequelize.STRING,
        allowNull: false
    },
    licenseDriving:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sectorShipping:{
        type: Sequelize.STRING,
        allowNull: false
    },
    dateExpiration:{
        type: Sequelize.DATE,
        allowNull: false
    }
})



export default Acesso;
