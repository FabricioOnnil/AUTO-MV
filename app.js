// Importar funcionalidades de outros arquivos
import { handleLogin } from './login.js';
import { setupDashboard } from './dashboard.js';


document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
            window.location.href = '/dashboard'; // Redireciona para a página de dashboard
        }
    })
    .catch(error => console.error('Error:', error));
});

/* Função para lidar com o login
function handleLogin(username, password) {
    // Aqui você pode adicionar lógica para fazer a requisição ao servidor
    // e lidar com a resposta para validar o login
    // Por exemplo, você pode usar fetch() para enviar os dados de login ao servidor
    // e receber uma resposta com a validação do login

    // Este é um exemplo simples de validação no lado do cliente
    if (username === 'user1' && password === 'pass1') {
        redirectToDashboard(); // Redireciona para a página de dashboard se o login for válido
    } else {
        displayMessage('Invalid username or password'); // Exibe uma mensagem de erro
    }
}*/

// Função para lidar com o login
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
        if (data.success) {
            redirectToDashboard(); // Redireciona para a página de dashboard se o login for válido
        } else {
            displayMessage(data.message); // Exibe mensagem de erro do servidor
        }
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('An error occurred. Please try again later.');
    });
}


// Função para redirecionar para a página de dashboard
function redirectToDashboard() {
    window.location.href = '/dashboard.html';
}

// Função para exibir mensagens na página
function displayMessage(message) {
    document.getElementById('message').textContent = message;
}

// Event listener para o formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    handleLogin(username, password); // Chama a função de login
});


// Função principal para inicializar o aplicativo
function initApp() {
    // Inicializar funcionalidades comuns
    handleLogin();
    
    // Verificar a página atual e inicializar funcionalidades específicas
    if (window.location.pathname === '/dashboard.html') {
        setupDashboard();
    }
}

// Iniciar o aplicativo quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', initApp);




function goToSchedule() {
    window.location.href = '/schedule.html'; // Redireciona para a página de agendamento
}

function showMap() {
    window.location.href = '/map.html'; // Redireciona para a página do mapa
}