document.addEventListener("DOMContentLoaded", async function() {
    const calendarPopupSchedule = document.getElementById('calendarPopupSchedule');
    const closePopupScheduleButton = document.querySelector('.close-popupSchedule');
    const overlaySchedule = document.getElementById('overlaySchedule');
    const showCalendarButton = document.getElementById('showCalendarSchedule');  
    const showTablePopup = document.getElementById('showTablePopup');       
    const scheduleForm = document.getElementById('scheduleForm');
    const schedulesBody = document.getElementById('schedulesBody');
    const tablePopup = document.getElementById('tablePopup');
    const overlayTable = document.getElementById('overlayTable');

    async function loadCarros() {
        try {
            const response = await fetch('/carro');
            const contentType = response.headers.get('content-type');

            if (response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const carros = await response.json();
                    console.log("Carros carregados com sucesso:", carros);

                    const carSelect = document.getElementById('carSelect');
                    carSelect.innerHTML = '<option value="">-Selecione um Carro-</option>';

                    carros.forEach(carro => {
                        const option = document.createElement('option');
                        option.value = carro.i_carro_idcar;
                        option.text = `${carro.s_carro_model} - ${carro.s_carro_plate}`;
                        carSelect.appendChild(option);
                    });
                } else {
                    console.error('Resposta inesperada, não é JSON:', await response.text());
                    alert('Erro ao carregar carros. O servidor retornou uma resposta inesperada.');
                }
            } else {
                console.error('Erro na resposta:', await response.text());
                alert('Erro ao carregar carros. Verifique o servidor.');
            }
        } catch (error) {
            console.error('Erro ao carregar carros:', error);
            alert('Erro ao carregar carros. Por favor, tente novamente.');
        }
    }

    loadCarros();

    // Fechar popups
    function closePopup(popup, overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }

    overlayTable.addEventListener('click', () => closePopup(tablePopup, overlayTable));
    overlaySchedule.addEventListener('click', () => closePopup(calendarPopupSchedule, overlaySchedule));

    const closeTableButton = tablePopup ? tablePopup.querySelector('.close-popup') : null;
    if (closeTableButton) {
        closeTableButton.addEventListener('click', () => closePopup(tablePopup, overlayTable));
    }

    if (showCalendarButton) {
        showCalendarButton.addEventListener('click', function() {
            overlaySchedule.style.display = 'block';
            calendarPopupSchedule.style.display = 'block';
        });
    }

    // Submeter formulário de agendamento
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value.trim;
            const startDate = document.getElementById("startDate").value;
            const startTime = document.getElementById("startTime").value;
            const deliverEndDate = document.getElementById("deliverEndDate").value;
            const originSelect = document.getElementById("originSelect").value; 
            const km_initial = document.getElementById("km_initial").value;
            const carSelectElement = document.getElementById("carSelect").value;
            const carSelect = carSelectElement.value;
            const scheduleCar = carSelectElement.options[carSelectElement.selectedIndex].text;


            if (!nome || !startDate || !startTime || !deliverEndDate || !originSelect || !km_initial || !carSelect) {
                alert('Por favor, preencha todos os  campos obrigatórios.');
                return;
            }

            const formData = {
                nome,
                startDate,
                startTime,
                deliverEndDate,
                originSelect,
                km_initial,
                carSelect, 
                s_agenda_scheduleCar: scheduleCar
            };

            try {
                const response = await fetch('/agenda', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    window.location.href = '/vamoAgenda';
                } else {
                    const errorText = await response.text();
                    console.error("Erro ao armazenar os dados:", errorText);
                    alert('Erro ao armazenar os dados. Tente novamente.');
                }
            } catch (error) {
                console.error("Erro ao armazenar os dados:", error);
                alert('Error ao armazenar os dados. Verifique usa conexão.');
            }
        });
    }

    async function fetchSchedules() {
        try {
            const response = await fetch('/agendamentos');
            const agendamentos = await response.json();
            schedulesBody.innerHTML = '';

            agendamentos.forEach(agendamento => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${agendamento.s_agenda_nameSchedule}</td>
                    <td>${agendamento.d_agenda_startDate}</td>
                    <td>${agendamento.d_agenda_startTime}</td>
                    <td>${agendamento.d_agenda_deliverEndDate}</td>
                    <td>${agendamento.s_agenda_originSelect}</td>
                    <td>${agendamento.i_agenda_kmInitial}</td>
                    <td>${agendamento.i_agenda_idCar}</td>
                `;
                schedulesBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
            alert('Erro ao carregar agendamentos. Tente novamente.');
        }
    }

    if (showTablePopup) {
        showTablePopup.addEventListener('click', () => {
            overlayTable.style.display = 'block';
            tablePopup.style.display = 'block';
            fetchSchedules();
        });
    }

    if (closePopupScheduleButton) {
        closePopupScheduleButton.addEventListener ('click', () => {
            closePopup (calendarPopupSchedule, overlaySchedule);
        });
    }
});
