import carroRoutes from './routes/carroRoutes.js';

app.use('/carro', carroRoutes);

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


    async function preencherCarSelect() {
        try {
            const response = await fetch('/carro');

            if(!response.ok) {
                throw new Error('Erro ao buscar carros' + response.statusText);
            }

            const carros = await response.json();
            const carSelect = document.getElementById("carSelect");

            carSelect.innerHTML = '';

            carros.forEach(carro => {
                const option = document.createElement("option");
                option.value = carro.i_carro_idcar;
                option.text = `${carro.s_carro_model} - ${carro.s_carro_plate}`;
                carSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao buscar carros:", error);
        }
    }

    preencherCarSelect();

    // Fechar popups
    function closePopup(popup, overlay) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }

    if (closePopupScheduleButton) {
        closePopupScheduleButton.addEventListener('click', function() {
            closePopup(calendarPopupSchedule, overlaySchedule);
        });
    }

    if (showCalendarButton) {
        showCalendarButton.addEventListener('click', function() {
            overlaySchedule.style.display = 'block';
            calendarPopupSchedule.style.display = 'block';
        });
    }

    // Exibir popup da tabela com agendamentos
    if (showTablePopup) {
        showTablePopup.addEventListener('click', async function() {
            try {
                const response = await fetch('/agendamentos');
                const agendamentos = await response.json();
                schedulesBody.innerHTML = ''; // Limpa as linhas existentes

                agendamentos.forEach(agendamento => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${agendamento.s_agenda_nameSchedule}</td>
                        <td>${agendamento.d_agenda_startDate}</td>
                        <td>${agendamento.d_agenda_startTime}</td>
                        <td>${agendamento.d_agenda_deliverEndDate}</td>
                        <td>${agendamento.s_agenda_originSelect}</td>
                        <td>${agendamento.s_agenda_officeEnd}</td>
                        <td>${agendamento.s_agenda_scheduleCar}</td>
                    `;
                    schedulesBody.appendChild(row);
                });

                overlayTable.style.display = 'block';
                tablePopup.style.display = 'block';
            } catch (error) {
                console.error('Erro ao carregar agendamentos:', error);
            }
        });
    }

    const closeTableButton = tablePopup ? tablePopup.querySelector('.close-popup') : null;
    if (closeTableButton) {
        closeTableButton.addEventListener('click', function() {
            closePopup(tablePopup, overlayTable);
        });
    }

    // Submeter formulário de agendamento
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const startDate = document.getElementById("startDate").value;
            const startTime = document.getElementById("startTime").value;
            const deliverEndDate = document.getElementById("deliverEndDate").value;
            const origin = document.getElementById("originSelect").value; 
            const rota = document.getElementById("rota").value;
            const km_initial = document.getElementById("km_initial").value;
            const carSelect = document.getElementById("carSelect").value;

            const formData = {
                nome,
                startDate,
                startTime,
                deliverEndDate,
                originSelect: origin,
                rota,
                km_initial,
                carSelect
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
                    overlaySchedule.style.display = 'none';
                    calendarPopupSchedule.style.display = 'none';
                    window.location.href = '/vamoAgenda';
                } else {
                    console.error("Erro ao armazenar os dados:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao armazenar os dados:", error);
            }
        });
    }

    // Atualizar lista de agendamentos a cada 5 minutos
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
                    <td>${agendamento.s_agenda_officeEnd}</td>
                `;
                schedulesBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
        }
    }

    fetchSchedules();
    setInterval(fetchSchedules, 300000); // Atualiza a cada 5 minutos
});
