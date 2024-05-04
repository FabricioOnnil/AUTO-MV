const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

const users = [
    { username: 'user1', password: '1' },
    { username: 'user2', password: '2' }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.post('/login', (req, res) => {
   
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json( {success: true} );
        console.log ("goldoVasco");
        res.redirect('/dashboard');
    } else {
        res.status(401).json({ success: false, message: 'Usuario invalido tente de novo' });
    }
});

app.use('/banco', express.static(path.join(__dirname, 'banco')));

app.get('/banco/carros.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'banco', 'carros.json'));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Configuração da conexão com o banco de dados----------------------------------------------
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'FabricioRocha',
    password: 'F1Rocha2!',
    database: 'vamoCompleto'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rotas
app.get('/refeicao', (req, res) => {
    connection.query('SELECT * FROM refeicao', (err, results) => {
        if (err) {
            console.error('Erro ao buscar refeicao:', err);
            res.status(500).send('Erro ao buscar refeicao');
            return;
        }
        res.json(results);
    });
});

app.post('/refeicao', (req, res) => {
    const { descricao, valor, data_compra, foto } = req.body;
    connection.query(
        'INSERT INTO refeicao (descricao, valor, data_compra, foto) VALUES (?, ?, ?, ?)',
        [descricao, valor, data_compra, foto],
        (err, results) => {
            if (err) {
                console.error('Erro ao inserir refeicao:', err);
                res.status(500).send('Erro ao inserir refeicao');
                return;
            }
            res.status(201).send('Compra inserida com sucesso');
        }
    );
});

//Fim da Configuração do Banco de Dados --------------------------------------------------