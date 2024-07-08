import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const usuario = db.sequelize.define('usuario', { 
    i_usuario_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    s_usuario_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    s_usuario_secondName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    s_usuario_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    i_usuario_licenseDriving: {
      type: DataTypes.STRING,
      allowNull: false
    },
    s_usuario_sectorShipping: {
      type: DataTypes.STRING,
      allowNull: false
    },
    d_usuario_dateExpiration: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dt_usuario_createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },},
     {
        tableName: 'usuario',
        timestamps: true, // This is true by default and manages `createdAt` and `updatedAt` automatically
  });


export default usuario;
