const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do body-parser para processar corpos de requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  hhost: 'localhost',
  user: 'FabricioRocha',
  password: 'F1Rocha2!',
  database: 'vamocompleto'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) throw err;
  console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Rota para receber dados do frontend e inserir no banco de dados
app.post('/salvarAgendamento', (req, res) => {
  const { nome, startDate, endDate, carro } = req.body;

  const sql = `INSERT INTO tabela_agendamentos (nome, data_inicio, data_termino, carro) VALUES (?, ?, ?, ?)`;
  db.query(sql, [nome, startDate, endDate, carro], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar agendamento no banco de dados');
    } else {
      console.log('Agendamento salvo no banco de dados');
      res.status(200).send('Agendamento salvo com sucesso');
    }
  });
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
