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

// Função para formatar a data no padrão brasileiro
function formatDateToBrazilian(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

document.addEventListener("DOMContentLoaded", function() {
    const closePopupButton = document.querySelector('.close-popupEntrega');
    const scheduleForm = document.getElementById('scheduleFormEntrega');
    const carSelect = document.getElementById('carSelect');
    const agendamentosBody = document.getElementById("agendamentosBody");

    // Função para abrir o pop-up com os dados preenchidos
    function showPopupWithFormData(formData, rowIndex) {
        document.getElementById("nome").value = formData.nome;
        document.getElementById("startDate").value = formData.startDate;
        document.getElementById("startTime").value = formData.startTime || "";
        document.getElementById("destinySelect").value = formData.destiny || "";
        document.getElementById("rota").value = formData.rota || "";
        document.getElementById("km_final").value = formData.km_final || "";
        carSelect.innerHTML = `<option value="${formData.carSelect}">${formData.carName}</option>`;
        document.getElementById("rowIndex").value = rowIndex;

        openPopup(); // Abre a janela pop-up
    }

    // Função para carregar os agendamentos do localStorage e preencher a tabela
    function loadAgendamentos() {
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentosBody.innerHTML = "";

        agendamentos.forEach((formData, index) => {
            const newRow = agendamentosBody.insertRow();
            newRow.insertCell(0).textContent = formData.nome;
            newRow.insertCell(1).textContent = formatDateToBrazilian(formData.startDate);
            newRow.insertCell(2).textContent = formData.origem;
            newRow.insertCell(3).textContent = formData.carName;

            const actionCell = newRow.insertCell(4);
            const entregaButton = document.createElement("button");
            entregaButton.textContent = "Entrega";
            entregaButton.addEventListener("click", () => showPopupWithFormData(formData, index));
            actionCell.appendChild(entregaButton);
        });
    }

    // Fechar a janela pop-up quando o botão de fechar é clicado
    if (closePopupButton) {
        closePopupButton.addEventListener('click', closePopup);
    }

    // Manipular o envio do formulário de entrega
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const rowIndex = document.getElementById("rowIndex").value;
            const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
            agendamentos.splice(rowIndex, 1); // Remove o item correspondente
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
            closePopup();
            loadAgendamentos();
        });
    }

    loadAgendamentos();
});
