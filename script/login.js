document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async function(event) {
      event.preventDefault(); // Evita o comportamento padrão de envio do formulário

      // Obter os valores do formulário
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      console.log('Enviando:', { username, password });

      // Fazer a requisição de login para o servidor
      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, password })
          });

          const result = await response.json();

          console.log('Resposta do servidor:', result);

          if (response.ok && result.success) {
              // Redirecionar para a página dashboard.html
              window.location.href = "dashboard.html";
          } else {
              // Exibir mensagem de erro (opcional)
              const errorMessage = document.getElementById("errorMessage");
              errorMessage.textContent = result.message || "Erro ao tentar fazer login. Tente novamente.";
          }
      } catch (error) {
          console.error('Erro ao tentar fazer login:', error);
          const errorMessage = document.getElementById("errorMessage");
          errorMessage.textContent = "Erro ao tentar fazer login. Tente novamente.";
      }
  });
});