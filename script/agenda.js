

//Agendamento de data -------------------------------------------

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


document.addEventListener("DOMContentLoaded", function() {
    const showCalendarButton = document.getElementById('showCalendar');
    const calendarPopup = document.getElementById('calendarPopup');
    const closeButton = document.querySelector('.close');
    const scheduleForm = document.getElementById("scheduleForm");
    const agendamentosBody = document.getElementById("agendamentosBody");
    const agendamentos = []; // Array para armazenar os agendamentos

    showCalendarButton.addEventListener('click', function() {
      calendarPopup.style.display = 'block';
  });

  closeButton.addEventListener('click', function() {
      calendarPopup.style.display = 'none';
  });
  
    scheduleForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  
      // Obter os valores do formulário
      const nome = document.getElementById("nome").value;
      const startDate = document.getElementById("startDate").value;
     // const endDate = document.getElementById("endDate").value;
      const origem = document.getElementByID('origem').value;
      const km_inicial = document.getElementByID('km_inicial').value;
      const carSelect = document.getElementById("carSelect");
      const carro = carSelect.options[carSelect.selectedIndex].text; // Obter o texto da opção selecionada
  
      // Criar objeto de agendamento
      const agendamento = { nome, startDate, origem, km_inicial, carro };
  
      // Adicionar agendamento ao array
      agendamentos.push(agendamento);
  
      // Limpar tabela de agendamentos
      agendamentosBody.innerHTML = "";
  
      // Atualizar tabela de agendamentos
      agendamentos.forEach(function(item) {
        const row = agendamentosBody.insertRow();
        row.innerHTML = `<td>${item.nome}</td><td>${item.startDate}</td><td>${item.origem}</td><td>${item.km_inical}</td><td>${item.carro}</td>`;
        agendamentosBody.appendChild(row); // Adicione esta linha para garantir que a linha seja adicionada corretamente
      });
  
        // Limpar formulário
        scheduleForm.reset();

        // Fechar o pop-up
        calendarPopup.style.display = 'none';

        alert('Agendamento salvo com sucesso!');
    });
  });
  

//Fim da Funçao Calendario ----------------------------------------------

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
  