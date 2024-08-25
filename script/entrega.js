

document.addEventListener("DOMContentLoaded", function() {
    const closePopupButton = document.querySelector('.close-popupDelivery');
    const scheduleForm = document.getElementById('scheduleFormDelivery');
    const carSelect = document.getElementById('carSelect');
    const appointmentsBody = document.getElementById("appointmentsBody");

    function openPopup() {
        const overlay = document.getElementById('overlaySchedule');
        const popupContainer = document.getElementById('calendarPopupDelivery');
        overlay.style.display = 'block';
        popupContainer.style.display = 'block';
    }
    
    function closePopup() {
        const overlay = document.getElementById('overlaySchedule');
        const popupContainer = document.getElementById('calendarPopupDelivery');
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

    function showPopupWithFormData(formData, rowIndex) {
        document.getElementById("nome").value = formData.nome;
        document.getElementById("startDate").value = formData.startDate;
        document.getElementById("startTime").value = formData.startTime || "";
        document.getElementById("destinySelect").value = formData.destiny || "";
        document.getElementById("km_final").value = formData.km_final || "";
        carSelect.innerHTML = `<option value="${formData.carSelect}">${formData.carName}</option>`;
        document.getElementById("rowIndex").value = rowIndex;

        openPopup(); 
    }
    function loadAgendamentos() {
        fetch('/agendamento')
            .then(response => response.json())
            .then(data => {
                appointmentsBody.innerHTML = ''; 

                data.forEach((agendamento, index) => {
                    const row = appointmentsBody.insertRow();

                    row.insertCell(0).textContent = agendamento.s_agenda_nameSchedule;
                    row.insertCell(1).textContent = formatDateToBrazilian(agendamento.d_agenda_startDate);
                    row.insertCell(2).textContent = agendamento.s_agenda_originSelect;
                    row.insertCell(3).textContent = agendamento.s_agenda_scheduleCar;

                    const actionCell = row.insertCell(4);
                    const entregaButton = document.createElement("button");
                    entregaButton.textContent = "Entrega";
                    entregaButton.addEventListener("click", () => showPopupWithFormData(agendamento, index));
                    actionCell.appendChild(entregaButton);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar agendamentos:', error);
            });
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', closePopup);
    }

    /*function loadAgendamentos() {
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
    }*/
    
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
