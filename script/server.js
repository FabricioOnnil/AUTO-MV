const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const util = require('util');
const dotenv = require('dotenv');
const multer = require('multer');
const app = express();
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'abastecimento.html'));
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

app.post('/saveAcesso', (req, res) => {
    const { nome, sobrenome, senha, numeroHabilitacao, orgaoExpedidor, validadeHabilitacao } = req.body;

    const query = `
        INSERT INTO user (firstName, secondName, password, licenseDriving, sectorShipping, dateExpiration)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    pool.query(query, [nome, sobrenome, senha, numeroHabilitacao, orgaoExpedidor, validadeHabilitacao], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Erro ao salvar informações de acesso.' });
        } else {
            res.status(200).json({ success: true, message: 'Informações de acesso salvas com sucesso' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
