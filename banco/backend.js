const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    startDate TEXT NOT NULL,
    origem TEXT NOT NULL,
    rota TEXT NOT NULL,
    km_inicial INTEGER NOT NULL,
    carSelect TEXT NOT NULL
  )`);
});

module.exports = db;
