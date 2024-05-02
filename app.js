// Função para lidar com o envio do formulário de login
function handleLogin(username, password) {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })

    .then(data => {
        document.getElementById('message').textContent = data.message;
        if (data.success) {
            window.location.href = '/dashboard.html'; // Redireciona para a página de dashboard se o login for válido
        }
         else {
        displayMessage(data.message); // Exibe mensagem de erro do servidor
        }
    })
    .catch(error => console.error('Error:', error));
    displayMessage('Um erro ocorreu. Por favor, tente novamente.');
}

// Event listener para o formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    handleLogin(username, password); // Chama a função de login
});



function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(-23.550520, -46.633308), // Localização inicial (Exemplo: São Paulo)
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}


// Inicializar o mapa ao carregar a página
window.onload = function () {
    initMap();
};



function redirectToMap() {
    const selectedCar = document.getElementById('carSelect').value;
    window.location.href = `maps.html?car=${selectedCar}`;
}


function getCarFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('car');
}

function initMap() {
    const car = getCarFromURL();
    console.log('Carro selecionado:', car);
    // Inicialize o mapa e defina o trajeto baseado no carro selecionado
}

window.onload = function() {
    initMap();
};


document.getElementById('showCalendar').addEventListener('click', function() {
    document.getElementById('calendarPopup').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('calendarPopup').style.display = 'none';
});

document.getElementById('scheduleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    console.log('Agendamento:', { name, startDate, endDate });
    document.getElementById('calendarPopup').style.display = 'none';
    alert('Agendamento salvo com sucesso!');
});


document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;
    console.log('Compra Registrada:', { descricao, valor, data });
    alert('Compra registrada com sucesso!');
});

// Acessar a câmera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        const video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
    })
    .catch(function(error) {
        console.error("Não foi possível acessar a câmera", error);
    });

document.getElementById('snap').addEventListener('click', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 320, 240);
});