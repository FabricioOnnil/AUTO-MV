import express from 'express';
import { create } from 'express-handlebars';
import Sequelize from 'sequelize';

const app = express();

// Config 
// Template Engine
const tempEng = create({ defaultLayout: 'main' });
app.engine('handlebars', tempEng.engine);
app.set('view engine', 'handlebars');

// Conexão com o banco de dados MySql
const sequelize = new Sequelize('vamo_auto_mv', 'root', '8mtkjg', {
    host: "localhost",
    dialect: 'mysql'
});

sequelize.authenticate().then(function() {
    console.log("Conectado com sucesso!");
}).catch(function(erro) {
    console.log("Falha ao se conectar: " + erro);
});

// ROTAS
app.get('/cad', function(req, res) {
    res.render('formulario')
});

app.listen(8081, function() {
    console.log("Servidor aberto na url http://localhost:8081");
});
