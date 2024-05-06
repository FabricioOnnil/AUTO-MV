


/* Função para o mapa--------------------------------------------------------
function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(-23.550520, -46.633308), // Localização inicial (Exemplo: São Paulo)
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function initMapCar() {
    const car = getCarFromURL();
    console.log('Carro selecionado:', car);
    // Inicialize o mapa e defina o trajeto baseado no carro selecionado
}



function getCarFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('car');
}*/




 /* Enviar os dados para o servidor----------------------------------
 fetch('/agenda', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, startDate, endDate}),
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao agendar carro');
    }
    return response.json();
})
.then(data => {
    alert(data.message); // Exibir mensagem de sucesso ou erro
    // Limpar o formulário ou realizar outras ações após a inserção
})
.catch(error => {
    console.error('Erro:', error);
    alert('Erro ao agendar carro');
});

document.getElementById('calendarPopup').style.display = 'none';
    alert('Agendamento salvo com sucesso!');

 //Fim do Agendamento--------------------------------------------------------


// Função para buscar os agendamentos no servidor e preencher a tabela
function buscarAgendamentos() {
    fetch('/agendamentos') // Rota para buscar os agendamentos no servidor
    .then(response => response.json())
    .then(data => {
        const agendamentosTable = document.getElementById('agendamentos');
        const tbody = agendamentosTable.querySelector('tbody');
        tbody.innerHTML = ''; // Limpar conteúdo atual da tabela

        data.forEach(agendamento => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${agendamento.nome}</td>
                <td>${agendamento.startDate}</td>
                <td>${agendamento.endDate}</td>
            `;
            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar agendamentos:', error);
        alert('Erro ao buscar agendamentos');
    });
}
// Adicionar evento de submissão do formulário para buscar agendamentos após agendar
document.getElementById('scheduleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    console.log('Agendamento:', { name, startDate, endDate });

    document.getElementById('calendarPopup').style.display = 'none';
    alert('Agendamento salvo com sucesso!');
    
    // Após agendar, buscar novamente os agendamentos para atualizar a tabela
    buscarAgendamentos();
});
// Fim da busca de agendamentos ---------------------------------------------
*/



/*
// Função para buscar e preencher os carros no select------------------


function buscarCarros() {
    fetch('/banco/carros.json')
    .then(response => {
        console.log('Status da resposta:', response.status); // Verifica o status da resposta
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data); // Verifica se os dados foram recebidos corretamente
        const selectCarros = document.getElementById('carSelect');
        selectCarros.innerHTML = ''; // Limpa opções existentes
        data.forEach(carro => {
            const option = document.createElement('option');
            option.value = carro.id;
            option.textContent = carro.nome;
            selectCarros.appendChild(option);
        });
    })
    .catch(error => console.error('Erro ao buscar carros:', error));
}
*/
//window.addEventListener('load', function() {
  //  initMap();         // Inicializa o mapa
  //  buscarCarros();    // Carrega os carros no select
   //   buscarAgendamentos(); // Buscar Agendamentos 
    // Inicializar o mapa ao carregar a página
    // Adicione outras funções que precisam ser executadas ao carregar a página
//});
// Fim da Função buscar Carros no select --------------------------




// Calendario ----------------------------------------------------
// app.js
const showCalendarBtn = document.getElementById('showCalendar');
if (showCalendarBtn) {
    showCalendarBtn.addEventListener('click', function() {
        document.getElementById('calendarPopup').style.display = 'block';
    });
} else {
    console.error('Elemento showCalendar não encontrado.');
}



// Agendamento de data -------------------------------------------

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('calendarPopup').style.display = 'none';
});

document.getElementById('scheduleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    console.log('Agendamento:', { nome, startDate, endDate });

    document.getElementById('calendarPopup').style.display = 'none';
    alert('Agendamento salvo com sucesso!');
});



document.addEventListener("DOMContentLoaded", function() {
    const scheduleForm = document.getElementById("scheduleForm");
    const agendamentosBody = document.getElementById("agendamentosBody");
    const agendamentos = []; // Array para armazenar os agendamentos
  
    scheduleForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  
      // Obter os valores do formulário
      const nome = document.getElementById("nome").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const carSelect = document.getElementById("carSelect");
      const carro = carSelect.options[carSelect.selectedIndex].text; // Obter o texto da opção selecionada
  
      // Criar objeto de agendamento
      const agendamento = { nome, startDate, endDate, carro };
  
      // Adicionar agendamento ao array
      agendamentos.push(agendamento);
  
      // Limpar tabela de agendamentos
      agendamentosBody.innerHTML = "";
  
      // Atualizar tabela de agendamentos
      agendamentos.forEach(function(item) {
        const row = agendamentosBody.insertRow();
        row.innerHTML = `<td>${item.nome}</td><td>${item.startDate}</td><td>${item.endDate}</td><td>${item.carro}</td>`;
        agendamentosBody.appendChild(row); // Adicione esta linha para garantir que a linha seja adicionada corretamente
      });
  
      // Limpar formulário
      scheduleForm.reset();
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
      const endDate = document.getElementById("endDate").value;
      const carSelect = document.getElementById("carSelect").value;
  
      // Enviar dados para o backend
      fetch('http://localhost:3000/vamocompleto/tabela_agendamentos/novo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, startDate, endDate, carro: carSelect }),
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
  