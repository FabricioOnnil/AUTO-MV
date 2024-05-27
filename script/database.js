const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8mtkjg',
  database: 'vamomv'
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      startDate DATE NOT NULL,
      origem VARCHAR(255) NOT NULL,
      rota VARCHAR(255) NOT NULL,
      km_inicial INT NOT NULL,
      carSelect VARCHAR(255) NOT NULL
    )
  `;

  connection.query(createTableQuery, (err, results, fields) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
      return;
    }
    console.log('Tabela agendamentos pronta.');
  });
});

module.exports = connection;
