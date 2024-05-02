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

