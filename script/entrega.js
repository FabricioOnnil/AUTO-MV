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
        document.getElementById("deliverEndDate").value = formData.d_agenda_startDate;
        document.getElementById("deliveryEndTime").value = formData.d_agenda_startTime || "";
        document.getElementById("officeEnd").value = formData.s_agenda_officeEnd || "";
        document.getElementById("km_final").value = formData.i_agenda_kmFinal || "";
        document.getElementById("carSelect").value = formData.i_agenda_deliveryCar;
        document.getElementById("rowIndex").value = formData.i_agenda_idSchedule; 
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
                    row.insertCell(2).textContent = formatDateToBrazilian(agendamento.d_agenda_deliverEndDate);
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
            alert("Entrega confirmada!");
        
            const rowIndex = document.getElementById("rowIndex").value;
            const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
            const agendamento = agendamentos[rowIndex];

            const entregaData = {
                s_entrega_nomeDelivery: document.getElementById("nome").value,
                d_entrega_deliveryEndDate: document.getElementById("deliverEndDate").value,
                d_entrega_deliveryEndTime: document.getElementById("deliveryEndTime").value,
                s_entrega_destinySelect: document.getElementById("officeEnd").value,
                i_entrega_kmFinal: document.getElementById("km_final").value,
                i_entrega_deliveryCar: document.getElementById("carSelect").value,
                d_entrega_createdAt: new Date(), 
                i_entrega_agendamento: document.getElementById("rowIndex").value 
            };

            fetch('/entrega', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entregaData),
            })
            .then(response => {
                if (response.ok) {
                    alert("Entrega confirmada!");
                    closePopup();
                    loadAgendamentos();
                } else {
                    alert("Erro ao confirmar entrega.");
                }
            })
            .catch(error => {
                console.error('Erro ao enviar dados da entrega:', error);
            });
        });
    }

            loadAgendamentos();
    


function loadCarros() {
    fetch('/carro')
        .then(response => response.json())
        .then(carros => {
            carSelect.innerHTML = '';
            carros.forEach(carro => {
                const option = document.createElement("option");
                option.value = carro.i_carro_idcar;
                option.textContent = `${carro.s_carro_model} - Placa: ${carro.s_carro_plate}`;;
                carSelect.appendChild(option);
            
            });
        })
        .catch(error => console.error('Erro ao carregar carros:', error.message));
}

loadCarros();
});