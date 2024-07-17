import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const diario = db.sequelize.define('diario', {
    //Identificador da tabela dirio.
    i_diario_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    s_diario_descricao: {
        type: DataTypes.STRING ('long'),
        allowNull: false,
    },

    d_diario_creatAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    d_diario_updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    i_diario_usuarioKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
},{
tableName: 'diario',
timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically

});

export default diario;