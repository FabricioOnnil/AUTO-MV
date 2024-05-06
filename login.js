// login.js

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    const users = {
        "usuario1": "senha1",
        "usuario2": "senha2",
        "usuario3": "senha3",
        // Adicione os demais usuários e senhas aqui
      };
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  
      // Obter os valores do formulário
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Verificar se o usuário e senha estão corretos
    if (users.hasOwnProperty(username) && users[username] === password) {
        // Redirecionar para a página dashboard.html
        window.location.href = "dashboard.html";
      } else {
        // Exibir mensagem de erro (opcional)
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = "Usuário ou senha incorretos. Tente novamente.";
      }
    });
  });