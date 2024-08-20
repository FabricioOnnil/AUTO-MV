
function openPopup() {
    const overlay = document.getElementById('overlayEntrega');
    const popupContainer = document.getElementById('calendarPopupEntrega');
    overlay.style.display = 'block';
    popupContainer.style.display = 'block';
}


function closePopup() {
    const overlay = document.getElementById('overlayEntrega');
    const popupContainer = document.getElementById('calendarPopupEntrega');
    overlay.style.display = 'none';
    popupContainer.style.display = 'none';
}


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

    
    function showPopupWithFormData(formData, rowIndex) {
        document.getElementById("nome").value = formData.nome;
        document.getElementById("startDate").value = formData.startDate;
        document.getElementById("startTime").value = formData.startTime || "";
        document.getElementById("destinySelect").value = formData.destiny || "";
        //document.getElementById("rota").value = formData.rota || "";
        document.getElementById("km_final").value = formData.km_final || "";
        carSelect.innerHTML = `<option value="${formData.carSelect}">${formData.carName}</option>`;
        document.getElementById("rowIndex").value = rowIndex;

        openPopup(); 
    }

    
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
            entregaButton.addEventListener("click", () => showPopupWithFormData(formData, rowIndex));
            actionCell.appendChild(entregaButton);
        });
    }
    function loadAgendamentos() {
            fetch('/agendamento')
                .then(response => response.json())
                .then(data => {
                    const tableBody = document.querySelector('#agendamentosTable tbody');
                    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
        
                    data.forEach(agendamento => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${agendamento.i_agendamento_agendado_id}</td>
                            <td>${agendamento.nome_agendamento}</td>
                            <td>${agendamento.data_agendamento}</td>
                            <td>${agendamento.horario_agendamento}</td>
                        `;
                        tableBody.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar agendamentos:', error);
                });
    }
    
    if (closePopupButton) {
        closePopupButton.addEventListener('click', closePopup);
    }

    
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const rowIndex = document.getElementById("rowIndex").value;
            const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
            agendamentos.splice(rowIndex, 1); 
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
            closePopup();
            loadAgendamentos();
        });
    }

    loadAgendamentos();
});
