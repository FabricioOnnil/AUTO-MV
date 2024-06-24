


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const util = require('util');
const dotenv = require('dotenv');
const multer = require('multer');

const PORT = 3000;

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '8mtkjg',
    database: process.env.DB_NAME || 'vamo_auto_mv',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const query = util.promisify(pool.query).bind(pool);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('../AUTO-MV'));
app.use('/estilos', express.static(path.join(__dirname, '../estilos')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../imagens')));

// Configuração do multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//--------------------------------app.gets----------------------------------



app.get('/vamo', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'vamo.html'));
});

/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'vamoInicial.html'));
});


app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dashboard.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.get('/calendario', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'calendario.html'));
});

app.get('/abastecimento', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'abastecimento.html'));
});

app.get('/agenda', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'agenda.html'));
});

app.get('/entrega', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'entrega.html'));
});

app.get('/gerencia', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'gerencia.html'));
});

app.get('/mapa', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'mapa.html'));
});

app.get('/refeicao', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'refeicao.html'));
});

app.get('/relatorio', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'relatorio.html'));
});

app.get('/reparos', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'reparos.html'));
});*/

//------------------Fim app.get----------------------------------------


app.post('/loginSave', (req, res) => {
    const { name, lastName, password, licensDriving, sectorShipping, dateExpiration } = req.body;

    const query = `
        INSERT INTO user (firstName, secondName, password, licensDriving, sectorShipping, dateExpiration)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    pool.query(query, [name, lastName, password, licensDriving, sectorShipping, dateExpiration], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Erro ao salvar informações de acesso.' });
        } else {
            res.status(200).json({ success: true, message: 'Informações de acesso salvas com sucesso.' });
        }
    });
});

app.post('/registrarAbastecimento', upload.single('imagem'), async (req, res) => {
    const { descricao, valor, data } = req.body;
    const imagem = req.file;

    if (!descricao || isNaN(parseFloat(valor)) || !Date.parse(data) || !imagem) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios e devem estar em formatos válidos.' });
    }

    const sql = 'INSERT INTO fuelStation (fuelDescription, fuelPrice, fuelDate, fuelImg) VALUES (?, ?, ?, ?)';
    const values = [descricao, valor, data, imagem.buffer];

    try {
        await query(sql, values);
        res.json({ success: true, message: 'Dados inseridos com sucesso.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Erro ao salvar dados.' });
    }
});

app.post('/saveInfo', (req, res) => {
    const { nomeCarro, placa, anoFabricacao, capacidadeTanque, mediaConsumo } = req.body;

    const query = `
        INSERT INTO Car (model, plate, manufactureYear, fuelTank, consumptionAverage)
        VALUES (?, ?, ?, ?, ?)
    `;

    pool.query(query, [nomeCarro, placa, anoFabricacao, capacidadeTanque, mediaConsumo], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao salvar as informações do carro.' });
        } else {
            res.status(200).json({ message: 'Informações do carro salvas com sucesso.' });
        }
    });
});




// Rota PUT para atualizar informações (exemplo genérico)
app.put('/atualizarInfo/:id', (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome } = req.body;

    // Implementação da lógica para atualização no banco de dados
    res.json({ success: true, message: `Informações com ID ${id} atualizadas.` });
});


// Rota DELETE para deletar informações (exemplo genérico)
app.delete('/deleteInfo/:id', (req, res) => {
    const { id } = req.params;

    // Implementação da lógica para exclusão no banco de dados
    res.json({ success: true, message: `Informações com ID ${id} deletadas.` });
});


app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
});