




// Função para abrir a janela pop-up
function openPopup() {
    const overlay = document.getElementById('overlayEntrega');
    const popupContainer = document.getElementById('calendarPopupEntrega');
    overlay.style.display = 'block';
    popupContainer.style.display = 'block';
}

// Função para fechar a janela pop-up
function closePopup() {
    const overlay = document.getElementById('overlayEntrega');
    const popupContainer = document.getElementById('calendarPopupEntrega');
    overlay.style.display = 'none';
    popupContainer.style.display = 'none';
}

// Função para armazenar os dados no localStorage
function storeFormData(nome, startDate, origem, rota, km_inicial, carName) {
    const formData = {
        nome,
        startDate,
        origem,
        rota,
        km_inicial,
        carName
    };

    // Obter os agendamentos existentes do localStorage
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Adicionar o novo agendamento
    agendamentos.push(formData);

    // Salvar de volta no localStorage
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}

document.addEventListener("DOMContentLoaded", function() {
    const closePopupButton = document.querySelector('.close-popupEntrega');
    const showCalendarButton = document.getElementById('showCalendarEntrega');

    showCalendarButton.addEventListener('click', function() {
        openPopup(); // Abre a janela pop-up quando o botão é clicado
    });

    closePopupButton.addEventListener('click', function() {
        closePopup(); // Fecha a janela pop-up quando o botão de fechar é clicado
    });

    // Agendamento de data
    document.getElementById('scheduleFormEntrega').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const startDate = document.getElementById('startDate').value;
        const origem = document.getElementById('origem').value;
        const rota = document.getElementById('rota').value;
        const km_inicial = document.getElementById('km_inicial').value;
        const carSelect = document.getElementById('carSelect').value;
        const carName = carSelect === 'carro1' ? 'MOBI - PPK_1234' : 'AUDI - PPX_3456';

        console.log('Agendamento:', { nome, startDate, origem, rota, km_inicial, carName });

        // Armazenar os dados no localStorage
        storeFormData(nome, startDate, origem, rota, km_inicial, carName);

        closePopup(); // Fecha a janela pop-up após o envio do formulário
        alert('Agendamento salvo com sucesso!');

        // Limpar formulário
        event.target.reset();

        // Atualizar a tabela com os novos dados
        loadFormData();
    });

    // Carregar os dados do localStorage e preencher a tabela de agendamentos
    function loadFormData() {
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        const agendamentosBody = document.getElementById("agendamentosBody");
        agendamentosBody.innerHTML = '';

        agendamentos.forEach(formData => {
            const newRow = agendamentosBody.insertRow();

            const nomeCell = newRow.insertCell(0);
            const startDateCell = newRow.insertCell(1);
            const origemCell = newRow.insertCell(2);
            const carSelectCell = newRow.insertCell(3);

            nomeCell.textContent = formData.nome;
            startDateCell.textContent = formData.startDate;
            origemCell.textContent = formData.origem;
            carSelectCell.textContent = formData.carName;
        });
    }

    loadFormData();
});
