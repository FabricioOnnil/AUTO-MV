const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const util = require('util');  // Importar util para promisify

const app = express();
const PORT = 3000;

// Configuração para permitir requisições CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8mtkjg',
    database: 'vamo_auto_mv'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Promisify db.query para usar com async/await
const query = util.promisify(db.query).bind(db);

// Rota para salvar agendamento
app.post('/vamocompleto/salvarAgendamento', async (req, res) => {
    const { nome, data_inicio, data_termino, carro } = req.body;
    const sql = 'INSERT INTO tabela_agendamentos (nome, data_inicio, data_termino, carro) VALUES (?, ?, ?, ?)';
    const values = [nome, data_inicio, data_termino, carro];

    try {
        await query(sql, values);
        console.log('Agendamento inserido com sucesso');
        res.status(200).send('Agendamento salvo com sucesso');
    } catch (err) {
        console.error('Erro ao inserir agendamento:', err);
        res.status(500).send('Erro ao salvar agendamento no banco de dados');
    }
});

// Rota para armazenar dados
app.post('/api/armazenar', async (req, res) => {
    const { nome, email } = req.body;
    const queryText = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    
    try {
        await query(queryText, [nome, email]);
        res.status(200).send('Dados armazenados com sucesso.');
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
        res.status(500).send('Erro ao armazenar dados.');
    }
});

// Rota para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para servir a página do dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Rota para servir o arquivo JSON de carros
app.get('/banco/carros.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'banco', 'carros.json'));
});

// Usuários de exemplo para login
const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
];

/// Rota para autenticação de login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Recebido', {username, password});

    const sql = 'SELECT * FROM usuarios WHERE primeiro_nome = ? AND senha_usuario = ?';
    const values = [username, password];

    try {
        const [results] = await query(sql, values);
        console.log('Resultados da consulta:', results);

        if (results.length > 0) {
            // Usuário encontrado e senha correta
            res.json({ success: true });
        } else {
            // Usuário não encontrado ou senha incorreta
            res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
        }
    } catch (err) {
        console.error('Erro ao autenticar usuário:', err);
        res.status(500).send('Erro ao autenticar usuário');
    }
});

// Rota para buscar refeições
app.get('/refeicao', async (req, res) => {
    try {
        const results = await query('SELECT * FROM refeicao');
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar refeição:', err);
        res.status(500).send('Erro ao buscar refeição');
    }
});

// Rota para inserir refeições
app.post('/refeicao', async (req, res) => {
    const { descricao, valor, data_compra, foto } = req.body;
    const sql = 'INSERT INTO refeicao (descricao, valor, data_compra, foto) VALUES (?, ?, ?, ?)';
    const values = [descricao, valor, data_compra, foto];

    try {
        await query(sql, values);
        res.status(201).send('Compra inserida com sucesso');
    } catch (err) {
        console.error('Erro ao inserir refeição:', err);
        res.status(500).send('Erro ao inserir refeição');
    }
});

/* Rota para agendar
app.post('/agenda', async (req, res) => {
    const { nome, startDate, endDate } = req.body;

    const data_inicio = new Date(startDate).toISOString().slice(0, 10);
    const data_termino = new Date(endDate).toISOString().slice(0, 10);

    const sql = 'INSERT INTO agendamentos (nome, data_inicio, data_termino) VALUES (?, ?, ?)';
    const values = [nome, data_inicio, data_termino];

    try {
        await query(sql, values);
        res.status(201).send('Agendamento inserido com sucesso');
    } catch (err) {
        console.error('Erro ao inserir agendamento:', err);
        res.status(500).send('Erro ao inserir agendamento');
    }
});*/

/* Rota para buscar agendamentos
app.get('/agendamentos', async (req, res) => {
    try {
        const results = await query('SELECT * FROM agendamentos');
        console.log('Agendamentos encontrados:', results);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
        res.status(500).send('Erro ao buscar agendamentos');
    }
}); */

/* Rota para buscar eventos por data
app.get('/eventos/:dia/:mes/:ano', async (req, res) => {
    const { dia, mes, ano } = req.params;
    const sql = 'SELECT * FROM tabela_agendamentos WHERE DAY(data_inicio) = ? AND MONTH(data_inicio) = ? AND YEAR(data_inicio) = ?';
    const values = [dia, mes, ano];

    try {
        const results = await query(sql, values);
        const hasEvents = results.length > 0;
        res.json({ hasEvents });
    } catch (err) {
        console.log("Erro ao consultar o banco de dados:", err);
        res.status(500).send("Erro ao consultar eventos");
    }
});*/

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
