<?php


// Pegando os dados vindos do formulario.
$name = $_POST['name'];
$lastName = $_POST['lastName'];
$password = $_POST['password'];
$licenseNumber = $_POST['licensDriving'];
$issuingDepartament = $_POST['sectorShippingt'];
$documentValidity = $_POST['dateExpiration'];

// data_atual = date('d/m/Y');  $hora_atual = date('H:i:s'); *** Vou usar em outro formulario

$server = 'localhost';
$user = 'root';
$password = '8mtkjg';
$database = 'vamo_auto_mv';

$conn = new mysqli($server, $user,$password, $database);


// verificar conexão
if($conn -> connect_error){
    die("Falha ao se comunicar com banco de dados: ".$conn -> connect_error);
}

$smtp = $conn->prepare("INSERT INTO user (firstName, secondName, password, licensDriving, sectorShipping, dateExpiration ) VALUES(?, ?, ?, ?, ?, ?)");

$smtp->bind_param("sssisd", $name, $lastName, $password, $licenseNumber, $issuingDepartament, $documentValidity);

if($smtp->execute()) {
    echo "Login Feito com Sucesso!";
}else {
    echo "Erro no login: ".$smtp->error;
}

$smtp->close();
$conn->close();

?>