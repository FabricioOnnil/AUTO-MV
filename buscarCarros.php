<?php
// Conexão com o banco de dados (substitua os valores conforme necessário)
$servername = "localhost";
$username = "seu_usuario";
$password = "sua_senha";
$database = "nome_do_banco";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $database);

// Verifica a conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Consulta para buscar os carros
$sql = "SELECT id, nome FROM carros";
$result = $conn->query($sql);

// Array para armazenar os resultados
$carros = array();

// Verifica se existem resultados
if ($result->num_rows > 0) {
    // Loop através dos resultados e armazena-os no array
    while($row = $result->fetch_assoc()) {
        $carros[] = $row;
    }
}

// Fecha a conexão com o banco de dados
$conn->close();

// Retorna os carros como dados JSON
echo json_encode($carros);
?>
