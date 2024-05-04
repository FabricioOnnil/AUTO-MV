
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
