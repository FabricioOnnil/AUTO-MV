const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2/promise');  // Usar mysql2/promise para suportar promessas
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
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '8mtkjg',
    database: 'vamomv'
};

const db = mysql.createPool(dbConfig);

// Verificação da conexão com o banco de dados
db.getConnection()
    .then(conn => {
        console.log('Conexão ao banco de dados estabelecida');
        conn.release();
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

// Rota para salvar agendamento
app.post('/vamocompleto/salvarAgendamento', async (req, res) => {
    const { nome, data_inicio, data_termino, carro } = req.body;
    const sql = 'INSERT INTO tabela_agendamentos (nome, data_inicio, data_termino, carro) VALUES (?, ?, ?, ?)';
    const values = [nome, data_inicio, data_termino, carro];

    try {
        const [result] = await db.query(sql, values);
        console.log('Agendamento inserido com sucesso');
        res.status(200).send('Agendamento salvo com sucesso');
    } catch (err) {
        console.error('Erro ao inserir agendamento:', err);
        res.status(500).send('Erro ao salvar agendamento no banco de dados');
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

// Rota para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        console.log("Login bem-sucedido");
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Usuário inválido, tente de novo' });
    }
});

// Rota para buscar refeições
app.get('/refeicao', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM refeicao');
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
        await db.query(sql, values);
        res.status(201).send('Compra inserida com sucesso');
    } catch (err) {
        console.error('Erro ao inserir refeição:', err);
        res.status(500).send('Erro ao inserir refeição');
    }
});

// Rota para agendar
app.post('/agenda', async (req, res) => {
    const { nome, startDate, endDate } = req.body;

    const data_inicio = new Date(startDate).toISOString().slice(0, 10);
    const data_termino = new Date(endDate).toISOString().slice(0, 10);

    const sql = 'INSERT INTO agendamentos (nome, data_inicio, data_termino) VALUES (?, ?, ?)';
    const values = [nome, data_inicio, data_termino];

    try {
        await db.query(sql, values);
        res.status(201).send('Agendamento inserido com sucesso');
    } catch (err) {
        console.error('Erro ao inserir agendamento:', err);
        res.status(500).send('Erro ao inserir agendamento');
    }
});

// Rota para buscar agendamentos
app.get('/agendamentos', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM agendamentos');
        console.log('Agendamentos encontrados:', results);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
        res.status(500).send('Erro ao buscar agendamentos');
    }
});

// Rota para buscar eventos por data
app.get('/eventos/:dia/:mes/:ano', async (req, res) => {
    const { dia, mes, ano } = req.params;
    const sql = 'SELECT * FROM tabela_agendamentos WHERE DAY(data_inicio) = ? AND MONTH(data_inicio) = ? AND YEAR(data_inicio) = ?';
    const values = [dia, mes, ano];

    try {
        const [results] = await db.query(sql, values);
        const hasEvents = results.length > 0;
        res.json({ hasEvents });
    } catch (err) {
        console.log("Erro ao consultar o banco de dados:", err);
        res.status(500).send("Erro ao consultar eventos");
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
