const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = 3306;

// Configuração para permitir requisições CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite acesso de qualquer origem
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers permitidos
    next();
});


// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'FabricioRocha',
    password: 'F1Rocha2!',
    database: 'vamocompleto'
});
// Verificação da conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão ao banco de dados estabelecida');
});

app.post('/vamocompleto/salvarAgendamento', (req, res) => {
    const { nome, data_inicio, data_termino, carro } = req.body;

const sql = `INSERT INTO tabela_agendamentos (nome, data_inicio, data_termino, carro) VALUES (?, ?, ?, ?)`;
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
  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//-----------------------------------------------------------------------




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/banco/carros.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'banco', 'carros.json'));
});

//Login ------------------------------------------------------------

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

// Fim do Login ------------------------------------------------------




// Configuração da conexão com o banco de dados----------------------------------------------

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

//Fim da Configuração do Banco de Dados ---------------------------------

// Configuração de agendamentos---------------------------------------

app.post('/agenda', (req, res) => {
    const { nome, startDate, endDate } = req.body;

    // Formate as datas para o formato YYYY-MM-DD esperado pelo MySQL
    const data_inicio = new Date(startDate).toISOString().slice(0, 10);
    const data_termino = new Date(endDate).toISOString().slice(0, 10);

    // Insira os dados na tabela agendamentos
    connection.query(
        'INSERT INTO agendamentos (nome, data_inicio, data_termino) VALUES (?, ?, ?)',
        [nome, data_inicio, data_termino],
        (err, results) => {
            if (err) {
                console.error('Erro ao inserir agendamento:', err);
                res.status(500).send('Erro ao inserir agendamento');
                return;
            }
            res.status(201).send('Agendamento inserido com sucesso');
        }
    );
});

app.get('/agendamentos', (req, res) => {
    // Aqui você deve buscar os agendamentos do banco de dados e retorná-los como um JSON
    // Execute a consulta SQL para buscar os agendamentos
    connection.query('SELECT * FROM agendamentos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar agendamentos:', err);
            res.status(500).send('Erro ao buscar agendamentos');
            return;
        }
        console.log('Agendamentos encontrados:', results);
        res.json(results); // Envie os resultados como JSON de volta ao cliente
    });
});

// Fim das buscas de agendamento --------------------------------------------

//---------------------------------------------

//---------------------------------------------