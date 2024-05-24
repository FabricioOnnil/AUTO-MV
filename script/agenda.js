// Função para abrir a janela pop-up
function openPopup() {
  overlay.style.display = 'block';
  popupContainer.style.display = 'block';
}

// Função para fechar a janela pop-up
function closePopup() {
  overlay.style.display = 'none';
  popupContainer.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
  const overlay = document.getElementById('overlay');
  const popupContainer = document.getElementById('popup-container');
  const closePopupButton = document.querySelector('.close-popup');

  // Agendamento de data -------------------------------------------

  document.querySelector('.close').addEventListener('click', function() {
      document.getElementById('calendarPopup').style.display = 'none';
  });

  document.getElementById('scheduleForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const startDate = document.getElementById('startDate').value;
      //const endDate = document.getElementById('endDate').value;
      const origem = document.getElementByID('origem').value;
      const km_inicial = document.getElementByID('km_inicial').value;
      console.log('Agendamento:', { nome, startDate, origem, km_inicial });

      document.getElementById('calendarPopup').style.display = 'none';
      alert('Agendamento salvo com sucesso!');
  });

  const showCalendarButton = document.getElementById('showCalendar');
  const calendarPopup = document.getElementById('calendarPopup');

  showCalendarButton.addEventListener('click', function() {
      openPopup(); // Abre a janela pop-up quando o botão é clicado
  });

  closePopupButton.addEventListener('click', function() {
      closePopup(); // Fecha a janela pop-up quando o botão de fechar é clicado
  });

  //Fim da Função Calendário ----------------------------------------------

  document.addEventListener("DOMContentLoaded", function() {
      const scheduleForm = document.getElementById("scheduleForm");

      scheduleForm.addEventListener("submit", function(event) {
          event.preventDefault(); // Evita o comportamento padrão de envio do formulário

          // Obter os valores do formulário
          const nome = document.getElementById("nome").value;
          const startDate = document.getElementById("startDate").value;
          const origem = document.getElementByID('origem').value;
          const km_inicial = document.getElementByID('km_inicial').value;
          //const endDate = document.getElementById("endDate").value;
          const carSelect = document.getElementById("carSelect").value;

          // Enviar dados para o backend
          fetch('http://localhost:3000/salvarAgendamento', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nome, startDate, origem, km_inicial, carro: carSelect }),
          })
              .then(response => response.text())
              .then(data => {
                  console.log(data); // Mostra a resposta do backend no console
                  alert('Agendamento salvo com sucesso');
              })
              .catch((error) => {
                  console.error('Erro ao salvar agendamento:', error);
                  alert('Erro ao salvar agendamento');
              });

          // Limpar formulário
          scheduleForm.reset();
      });
  });
});
