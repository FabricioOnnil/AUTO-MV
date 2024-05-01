// Função para lidar com o envio do formulário de login
function handleLogin(username, password) {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
        if (data.success) {
            window.location.href = '/dashboard.html'; // Redireciona para a página de dashboard se o login for válido
        }
    })
    .catch(error => console.error('Error:', error));
}

// Event listener para o formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    handleLogin(username, password); // Chama a função de login
});


// Função para inicializar o mapa
function initMap() {
    // Posição inicial (pode ser modificada conforme necessário)
    const initialPosition = { lat: -23.5505, lng: -46.6333 };

    // Opções do mapa
    const mapOptions = {
        center: initialPosition,
        zoom: 10
    };

    // Criar o mapa
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Obter a localização do dispositivo
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Adicionar marcador para a posição do usuário
            new google.maps.Marker({
                position: userPosition,
                map: map,
                title: 'Sua localização'
            });

            // Definir o centro do mapa para a posição do usuário
            map.setCenter(userPosition);
        }, error => {
            console.error('Error getting user location:', error);
            alert('Erro ao obter a localização do dispositivo.');
        });
    } else {
        alert('Geolocalização não é suportada neste navegador.');
    }
}

// Inicializar o mapa ao carregar a página
window.onload = function () {
    initMap();
};
