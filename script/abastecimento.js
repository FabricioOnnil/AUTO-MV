// Capturar o formulário
const form = document.getElementById('purchaseForm');
const snapButton = document.getElementById('snap');
const endButton = document.getElementById('endRegistration');

// Adicionar evento de envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    // Capturar os valores do formulário
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;

    // Enviar os dados para o backend via XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'backend.php'); // Substitua 'backend.php' pelo seu script de backend
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Mostrar mensagem de sucesso ou tratar resposta do backend
            alert('Dados enviados com sucesso!');
            // Habilitar o botão de Encerrar Cadastro após o envio
            endButton.disabled = false;
        } else {
            // Tratar erros
            alert('Erro ao enviar dados.');
        }
    };
    xhr.send(JSON.stringify({ descricao, valor, data }));

    // Exibir a confirmação da foto em um pop-up
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const video = document.getElementById('video');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Exemplo de exibição da imagem em um pop-up (substitua conforme necessário)
    const imgData = canvas.toDataURL();
    const imgPopup = window.open('', '_blank');
    imgPopup.document.write(`<img src="${imgData}" width="320" height="240">`);
    // Ativar a variável imagemCapturada após a captura da imagem
    imagemCapturada = true;
});

// Adicionar evento para capturar foto
snapButton.addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Ativar a variável imagemCapturada após a captura da imagem
    imagemCapturada = true;
});

// Adicionar evento para encerrar o cadastro e redirecionar para dashboard.html
endButton.addEventListener('click', function() {
    if (imagemCapturada) {
        window.location.href = 'dashboard.html'; // Redirecionar para a página dashboard.html
    } else {
        alert('Capture a imagem antes de encerrar o cadastro.');
    }
});

// Código para capturar foto (substitua conforme necessário)
const video = document.getElementById('video');
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.error('Erro ao acessar a câmera: ', err);
    });

// Adicionar evento para capturar foto
document.getElementById('snap').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

