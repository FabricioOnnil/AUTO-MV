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
        const km_inicial = document.getElementById('km_inicial').value;
        const carSelect = document.getElementById('carSelect').value;

        console.log('Agendamento:', { nome, startDate, origem, km_inicial, carSelect });

        closePopup(); // Fecha a janela pop-up após o envio do formulário
        alert('Agendamento salvo com sucesso!');

        // Enviar dados para o backend (exemplo)
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
        event.target.reset();
    });
});
