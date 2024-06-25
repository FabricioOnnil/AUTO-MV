import { createConnection } from 'mysql';

// Configurar a conexão com o banco de dados
const connection = createConnection({
  host: 'locahost',
  user: 'root',
  password: '8mtkjg',
  database: 'vamo_auto_mv'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados com o ID ' + connection.threadId);
});

// Função para inserir os dados na tabela abastecimento
function inserirAbastecimento(descricao, valor, data, imagem) {
  const sql = "INSERT INTO abastecimento (descricao_abast, valor_abast, data_abast, img_abast) VALUES (?, ?, ?, ?)";
  const values = [descricao, valor, data, imagem];
  
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir registro de abastecimento: ' + err.message);
      return;
    }
    console.log('Registro de abastecimento inserido com sucesso.');
  });
}

export default {
  inserirAbastecimento
};

