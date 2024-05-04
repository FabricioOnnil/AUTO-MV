



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

const showCalendarBtn = document.getElementById('showCalendar');
if (showCalendarBtn) {
    showCalendarBtn.addEventListener('click', function() {
        document.getElementById('calendarPopup').style.display = 'block';
    });
} else {
    console.error('Elemento showCalendar não encontrado.');
}

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

/*window.onload = function() {
    initMap();
};*/

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('calendarPopup').style.display = 'none';
});

document.getElementById('scheduleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    console.log('Agendamento:', { name, startDate, endDate });
    document.getElementById('calendarPopup').style.display = 'none';
    alert('Agendamento salvo com sucesso!');
});


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


// Função para buscar e preencher os carros no select---------------

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
    // Adicione outras funções que precisam ser executadas ao carregar a página
});

// Fim da Função buscar Carros no select --------------------------