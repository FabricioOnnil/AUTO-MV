import { Sequelize, DataTypes } from 'sequelize';
import db from './db.js';

const usuario = db.sequelize.define('usuario', { 
    //Identificador de linha da tabela de usuario.
    i_usuario_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    //Nome do usuario (que será usado para login)
    s_usuario_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    //Sobrenome para indetificação posterior.
    s_usuario_secondName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    //Senha para acesso. 
    s_usuario_password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    //Documento de Habilitação.
    i_usuario_licenseDriving: {
      type: DataTypes.STRING,
      allowNull: false
    },

    //Orgão expedidor do documento.
    s_usuario_sectorShipping: {
      type: DataTypes.STRING,
      allowNull: false
    },

    //Data de validade do documento de habilitação.
    d_usuario_dateExpiration: {
      type: DataTypes.DATE,
      allowNull: false
    },

    //Data de criação da Linha.
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
