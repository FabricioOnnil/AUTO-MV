import { DataTypes} from 'sequelize';
import db from './db.mjs';

const User = db.sequelize.define ('User', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secondName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    licenseDriving: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sectorShipping: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateExpiration: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaltValue: DataTypes.NOW,
    },
    updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},
{
    tableName: 'users', // Certifique-se de que o nome da tabela está correto
    timestamps: true, // Isso é redundante, pois timestamps é true por padrão
  });

export default User;