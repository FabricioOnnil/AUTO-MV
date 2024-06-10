const mysql = require('mysql');
const fs = require('fs');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: '10.3.152.165',    
    user: 'root',  
    password: '8mtkjg', 
    database: 'vamo_auto_mv' 
});

// Conectar ao banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados com sucesso.');

    // Consultar a tabela carros
    const query = 'SELECT id, nome, placa FROM carros';
    connection.query(query, (err, results) => {
        if (err) throw err;

        // Converter os resultados para JSON e salvar em um arquivo
        fs.writeFile('/banco/carros.json', JSON.stringify(results, null, 4), err => {
            if (err) {
                console.error('Erro ao escrever no arquivo: ' + err.stack);
                return;
            }
            console.log('Dados foram salvos com sucesso em carros.json');
        });

        // Fechar a conexão com o banco de dados
        connection.end();
    });
});

// Ler o conteúdo do arquivo carros.json
fs.readFile('carros.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo carros.json:', err);
        return;
    }
    console.log('Conteúdo do arquivo carros.json:');
    console.log(data);
});