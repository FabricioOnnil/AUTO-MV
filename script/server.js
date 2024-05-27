const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = 3000; // Mudei para 3000, pois a porta 3306 é geralmente usada pelo MySQL

// Configuração para permitir requisições CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite acesso de qualquer origem
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers permitidos
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8mtkjg',
    database: 'vamomv'
});

// Verificação da conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão ao banco de dados estabelecida');
});

// Rota para salvar agendamento
app.post('/vamocompleto/salvarAgendamento', (req, res) => {
    const { nome, data_inicio, data_termino, carro } = req.body;
    const sql = 'INSERT INTO tabela_agendamentos (nome, data_inicio, data_termino, carro) VALUES (?, ?, ?, ?)';
    const values = [nome, data_inicio, data_termino, carro];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir agendamento:', err);
            res.status(500).send('Erro ao salvar agendamento no banco de dados');
        } else {
            console.log('Agendamento inserido com sucesso');
            res.status(200).send('Agendamento salvo com sucesso');
        }
    });
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

// Rota para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true });
        console.log("Login bem-sucedido");
        res.redirect('/dashboard');
    } else {
        res.status(401).json({ success: false, message: 'Usuário inválido, tente de novo' });
    }
});

// Rota para buscar refeições
app.get('/refeicao', (req, res) => {
    db.query('SELECT * FROM refeicao', (err, results) => {
        if (err) {
            console.error('Erro ao buscar refeição:', err);
            res.status(500).send('Erro ao buscar refeição');
            return;
        }
        res.json(results);
    });
});

// Rota para inserir refeições
app.post('/refeicao', (req, res) => {
    const { descricao, valor, data_compra, foto } = req.body;
    const sql = 'INSERT INTO refeicao (descricao, valor, data_compra, foto) VALUES (?, ?, ?, ?)';
    const values = [descricao, valor, data_compra, foto];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao inserir refeição:', err);
            res.status(500).send('Erro ao inserir refeição');
            return;
        }
        res.status(201).send('Compra inserida com sucesso');
    });
});

// Rota para agendar
app.post('/agenda', (req, res) => {
    const { nome, startDate, endDate } = req.body;

    const data_inicio = new Date(startDate).toISOString().slice(0, 10);
    const data_termino = new Date(endDate).toISOString().slice(0, 10);

    const sql = 'INSERT INTO agendamentos (nome, data_inicio, data_termino) VALUES (?, ?, ?)';
    const values = [nome, data_inicio, data_termino];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao inserir agendamento:', err);
            res.status(500).send('Erro ao inserir agendamento');
            return;
        }
        res.status(201).send('Agendamento inserido com sucesso');
    });
});

// Rota para buscar agendamentos
app.get('/agendamentos', (req, res) => {
    db.query('SELECT * FROM agendamentos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar agendamentos:', err);
            res.status(500).send('Erro ao buscar agendamentos');
            return;
        }
        console.log('Agendamentos encontrados:', results);
        res.json(results);
    });
});

// Rota para buscar eventos por data
app.get('/eventos/:dia/:mes/:ano', (req, res) => {
    const { dia, mes, ano } = req.params;
    const sql = 'SELECT * FROM tabela_agendamentos WHERE DAY(data_inicio) = ? AND MONTH(data_inicio) = ? AND YEAR(data_inicio) = ?';
    const values = [dia, mes, ano];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.log("Erro ao consultar o banco de dados:", err);
            res.status(500).send("Erro ao consultar eventos");
        } else {
            const hasEvents = results.length > 0;
            res.json({ hasEvents });
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
