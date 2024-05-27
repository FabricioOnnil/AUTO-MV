document.addEventListener("DOMContentLoaded", function() {
    const showCalendarButton = document.getElementById('showCalendarAgenda');
    const overlay = document.getElementById('overlayAgenda');
    const calendarPopup = document.getElementById('calendarPopupAgenda');
    const closePopupButton = document.querySelector('.close-popupAgenda');

    showCalendarButton.addEventListener('click', function() {
        overlay.style.display = 'block';
        calendarPopup.style.display = 'block';
    });

    closePopupButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        calendarPopup.style.display = 'none';
    });

    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
        calendarPopup.style.display = 'none';
    });

    const scheduleForm = document.getElementById("scheduleFormAgenda");

    // Mapear valores do select para os nomes dos carros
    const carMap = {
        carro1: 'MOBI - PPK_1234',
        carro2: 'AUDI - PPX_3456'
    };

    scheduleForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        // Obter os valores do formulário
        const nome = document.getElementById("nome").value;
        const startDate = document.getElementById("startDate").value;
        const origem = document.getElementById("origem").value;
        const carSelect = document.getElementById("carSelect").value;

        // Obter o nome do carro do mapa
        const carName = carMap[carSelect] || 'Carro não selecionado';

        // Adicionar os dados na tabela
        const agendamentosBody = document.getElementById("agendamentosBody");
        const newRow = agendamentosBody.insertRow();

        const nomeCell = newRow.insertCell(0);
        const startDateCell = newRow.insertCell(1);
        const origemCell = newRow.insertCell(2);
        const carSelectCell = newRow.insertCell(3);

        nomeCell.textContent = nome;
        startDateCell.textContent = startDate;
        origemCell.textContent = origem;
        carSelectCell.textContent = carName;

        // Fechar o popup
        overlay.style.display = 'none';
        calendarPopup.style.display = 'none';

        // Limpar o formulário
        scheduleForm.reset();
    });
});
