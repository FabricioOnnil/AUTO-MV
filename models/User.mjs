import { Sequelize, DataTypes } from 'sequelize';
import db from './db.mjs';

const User = db.sequelize.define('user', { // Aqui está corrigido para 'user'
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false
    },
    licenseDriving: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sectorShipping: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateExpiration: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

  });


export default User;
