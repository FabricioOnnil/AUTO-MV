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
        document.getElementById("nome").value = formData.s_entrega_nameDelivery;
        document.getElementById("deliverEndDate").value = formData.d_entrega_deliverEndDate;
        document.getElementById("deliveryEndTime").value = formData.d_entrega_deliverEndTime || "";
        document.getElementById("officeEnd").value = formData.s_entrega_destinySelect || "";
        document.getElementById("km_final").value = formData.i_entrega_kmFinal || "";
        document.getElementById("carSelect").value = formData.i_entrega_deliveryCar;
        document.getElementById("i_agenda_agendamento").value = formData.i_entrega_agendamento; 
        openPopup(); 
    }

    function loadAgendamentos() {
        
        fetch('/agendamento')
            .then(response => response.json())
            .then(data => {
                appointmentsBody.innerHTML = ''; 

                data.forEach((agendamento, index) => {
                    const row = appointmentsBody.insertRow();

                    row.insertCell(0).textContent = agendamento.s_entrega_nameDelivery;
                    row.insertCell(1).textContent = formatDateToBrazilian(agendamento.d_entrega_deliveryEndDate);
                    row.insertCell(2).textContent = formatDateToBrazilian(agendamento.d_entrega_deliverEndTime);
                    row.insertCell(3).textContent = agendamento.s_entrega_destinySelect;
                    row.insertCell(4).textContent = agendamento.s_entrega_dekiveryCar;

                    const actionCell = row.insertCell(5);
                    actionCell.classList.add("acao");
                    
                    const entregaImage = document.createElement("img");
                    entregaImage.src = "/Imagens/registrarbutton.png"; 
                    entregaImage.alt = "Entregar";
                    entregaImage.style.cursor = "pointer"; 
                    entregaImage.addEventListener("click", () => showPopupWithFormData(agendamento, index));
                    actionCell.appendChild(entregaImage);
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
        
            /*const rowIndex = document.getElementById("rowIndex").value;
            const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
            const agendamento = agendamentos[rowIndex];*/

            const entregaData = {
                s_entrega_nameDelivery: document.getElementById("nome").value,
                d_entrega_deliveryEndDate: document.getElementById("deliverEndDate").value,
                d_entrega_deliveryEndTime: document.getElementById("deliveryEndTime").value,
                s_entrega_destinySelect: document.getElementById("officeEnd").value,
                i_entrega_kmFinal: document.getElementById("km_final").value,
                i_entrega_deliveryCar: document.getElementById("carSelect").value,
                d_entrega_createdAt: new Date(), 
                i_entrega_agendamento: document.getElementById("i_agenda_agendamento").value
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