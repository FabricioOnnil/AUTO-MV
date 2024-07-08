
import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const reparo = db.sequelize.define('reparo', {
    i_reparo_idRepair: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    s_reparo_description: {
        type: DataTypes.STRING, 
        allowNull: false    
    },

    dec_reparo_prideRepair: {
        type: DataTypes.DECIMAL(9,2),
        allowNull: false
    },

    d_reparo_dateRepair: {
        type: DataTypes.DATE,
        allowNull: false
    },

    l_reparo_imgRepair: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },

    d_reparo_createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    d_reparo_updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },},
    {
        tableName: 'reparo',
        timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically

})





export default reparo;