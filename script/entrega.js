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
        document.getElementById("nome").value = formData.s_agenda_nameSchedule;
        document.getElementById("startDate").value = formData.d_agenda_startDate;
        document.getElementById("startTime").value = formData.startTime || "";
        document.getElementById("destinySelect").value = formData.s_agenda_originSelect || "";
        document.getElementById("km_final").value = formData.km_final || "";
        carSelect.innerHTML = `<option value="${formData.carSelect}">${formData.s_agenda_scheduleCar}</option>`;
        document.getElementById("rowIndex").value = rowIndex;

        openPopup(); 
    }

    function loadAgendamentos() {
        
        fetch('/agendamentos')
            .then(response => response.json())
            .then(data => {
                appointmentsBody.innerHTML = ''; 

                data.forEach((agendamento, index) => {
                    const row = appointmentsBody.insertRow();

                    row.insertCell(0).textContent = agendamento.s_agenda_nameSchedule;
                    row.insertCell(1).textContent = formatDateToBrazilian(agendamento.d_agenda_startDate);
                    row.insertCell(2).textContent = agendamento.d_agenda_deliverEndDate;
                    row.insertCell(3).textContent = agendamento.s_agenda_originSelect;
                    row.insertCell(4).textContent = agendamento.s_agenda_officeEnd;
                    row.insertCell(5).textContent = agendamento.s_agenda_scheduleCar;

                    const actionCell = row.insertCell(6);
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
