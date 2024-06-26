import express from 'express';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import Sequelize from 'sequelize';

const app = express();

// Definindo __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Configuração do diretório de views
app.set('views', join(__dirname, '..', 'views'));

// Configuração do Template Engine
const hbs = create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configuração para servir arquivos estáticos
app.use(express.static(join(__dirname, '..'))); // Isso serve a pasta raiz que contém todas as outras pastas

// ROTAS para servir arquivos HTML estáticos
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoIndex.html'));
});

app.get('/vamoInicial', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoInicial.html'));
});

app.get('/vamoLogin', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoLogin.html'));
});

app.get('/vamoCalendario', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoCalendario.html'));
});

app.get('/vamoDashboard', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoDashboard.html'));
});

app.get('/vamoAgenda', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoAgenda.html'));
});

app.get('/vamoEntrega', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoEntrega.html'));
});

app.get('/vamoRefeicao', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoRefeicao.html'));
});

app.get('/vamoAbastecimento', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoAbastecimento.html'));
});

app.get('/vamoRelatorio', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoRelatorio.html'));
});

app.get('/vamoReparos', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoReparos.html'));
});

app.get('/vamoGerencia', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoGerencia.html'));
});

app.get('/vamoMapa', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoMapa.html'));
});

app.listen(8081, function() {
    console.log("Servidor aberto na url http://localhost:8081");
});
