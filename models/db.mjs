import Sequelize from 'sequelize';

// Conexão com o banco de dados MySql
const sequelize = new Sequelize('vamo_auto_mv', 'root', '8mtkjg', {
    host: "localhost",
    dialect: 'mysql'
});

export default {
    Sequelize: Sequelize,
    sequelize: sequelize
}