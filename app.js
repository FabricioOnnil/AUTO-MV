/*const mysql = require('mysql');
const fs = require('fs');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'seu_banco_de_dados'
});

// Conectando ao banco de dados
connection.connect(err => {
    if (err) throw err;
    console.log('Conectado com sucesso ao banco de dados!');

    // Consultando a tabela carros
    const query = 'SELECT nome_carro, placa FROM carros';
    connection.query(query, (err, results) => {
        if (err) throw err;

        // Salvando os resultados em um arquivo JSON
        fs.writeFile('carros.json', JSON.stringify(results, null, 4), err => {
            if (err) throw err;
            console.log('Dados foram salvos em carros.json!');
        });

        // Fechando a conexão com o banco
        connection.end();
    });
});
*/



// Função para o mapa--------------------------------------------------------
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

function redirectToMap() {
    const selectedCar = document.getElementById('carSelect').value;
    window.location.href = `maps.html?car=${selectedCar}`;
}

function getCarFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('car');
}


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



 // Enviar os dados para o servidor----------------------------------
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

// Fim do Agendamento--------------------------------------------------------


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




document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;
    console.log('Compra Registrada:', { descricao, valor, data });
    alert('Compra registrada com sucesso!');
});




// Acessar a câmera ------------------------------------------------------
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

window.addEventListener('load', function() {
    initMap();         // Inicializa o mapa
    buscarCarros();    // Carrega os carros no select
    buscarAgendamentos(); // Buscar Agendamentos 
    // Inicializar o mapa ao carregar a página
    // Adicione outras funções que precisam ser executadas ao carregar a página
});
// Fim da Função buscar Carros no select --------------------------





// Calendario ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há agendamentos no armazenamento local
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Exibe os agendamentos na página
    const agendamentosDiv = document.getElementById('agendamentos');
    agendamentosDiv.innerHTML = '<h2>Agendamentos</h2>';
    if (agendamentos.length === 0) {
        agendamentosDiv.innerHTML += '<p>Nenhum agendamento encontrado.</p>';
    } else {
        const ul = document.createElement('ul');
        agendamentos.forEach(function(agendamento) {
            const li = document.createElement('li');
            li.textContent = `${agendamento.descricao} - Data: ${agendamento.data}`;
            ul.appendChild(li);
        });
        agendamentosDiv.appendChild(ul);
    }
});

//Fim da Funçao Calendario ----------------------------------------------