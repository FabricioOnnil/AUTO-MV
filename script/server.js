const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const util = require('util');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8mtkjg',
    database: 'vamo_auto_mv'
});



const query = util.promisify(db.query).bind(db);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dashboard.html'));
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Recebido', {username, password});

    const sql = 'SELECT * FROM usuario WHERE primeiro_nome = ? AND senha_usuario = ?';
    const values = [username, password];

    try {
        const [results] = await query(sql, values);
        console.log('Resultados da consulta:', results);

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Usuário ou senha incorretos.' });
        }
    } catch (err) {
        console.error('Erro ao autenticar usuário:', err);
        res.status(500).send('Erro ao autenticar usuário');
    }
});

app.post('/registrarAbastecimento', (req, res) => {
    const { descricao, valor, data, imagem } = req.body;

    // Chamar a função do módulo de banco de dados para inserir os dados na tabela
    db.inserirAbastecimento(descricao, valor, data, imagem)
        .then(result => {
            res.json({ success: true, message: 'Dados inseridos com sucesso.' });
        })
        .catch(error => {
            res.status(500).json({ success: false, message: 'Erro ao inserir dados no banco de dados.' });
        });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


