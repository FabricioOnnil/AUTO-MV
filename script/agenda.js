document.addEventListener("DOMContentLoaded", function() {
    const calendarPopupSchedule = document.getElementById('calendarPopupSchedule');    
    const closePopupScheduleButton = document.querySelector('.close-popupSchedule');
    const closePopupSchedulesButton = document.querySelector('.close-popupSchedules'); 
    const overlaySchedule = document.getElementById('overlaySchedule');
    const overlayTable = document.getElementById('overlayTable');
    const schedulesBody = document.getElementById('schedulesBody');
    const showCalendarButton = document.getElementById('showCalendarSchedule');  
    const showTablePopup = document.getElementById('showTablePopup');       
    const scheduleForm = document.getElementById('scheduleForm');    
    const tablePopup = document.getElementById('tablePopup');
    

    console.log("DOM loaded");


    if (closePopupScheduleButton) {
        closePopupScheduleButton.addEventListener('click', function() {
            console.log("Close calendar popup button acionado");
            overlaySchedule.style.display = 'none';
            calendarPopupSchedule.style.display = 'none';
        });
    } else {
        console.error("closePopupScheduleButton não acionado");
    }


    if (closePopupSchedulesButton) {
        closePopupSchedulesButton.addEventListener('click', function() {
            console.log("Close schedules popup button clicked");
            overlaySchedule.style.display = 'none';
            calendarPopupSchedule.style.display = 'none';
        });
    } else {
        console.error("closePopupSchedulesButton not found");
    }


    if (overlaySchedule) {
        overlaySchedule.addEventListener('click', function() {
            console.log("Overlay clicked");
            overlaySchedule.style.display = 'none';
            calendarPopupSchedule.style.display = 'none';
        });
    } else {
        console.error("overlaySchedule not found");
    }  



    if (showCalendarButton) {
        showCalendarButton.addEventListener('click', function() {
            console.log("Botão schedule acionado");
            overlaySchedule.style.display = 'block';
            calendarPopupSchedule.style.display = 'block';
        });
    } else {
        console.error("Botão schedule não acionado.");
    }

    if (showTablePopup) {
        showTablePopup.addEventListener('click', async function() {
            try {
                const response = await fetch('/agendamentos');
                const agendamentos = await response.json();

                const schedulesBody = document.getElementById('schedulesBody');
                schedulesBody.innerHTML = ''; // Limpa as linhas existentes

                agendamentos.forEach(agendamento => {

                    const row = document.createElement('tr');

                    
                    row.innerHTML = `
                        <td>${agendamento.nome}</td>
                        <td>${agendamento.dataAgendada}</td>
                        <td>${agendamento.hora}</td>
                        <td>${agendamento.origem}</td>
                        <td>${agendamento.rota}</td>
                        <td>${agendamento.kmInicial}</td>
                        <td>${agendamento.carroSelecionado}</td>
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
            overlayTable.style.display = 'none';
            tablePopup.style.display = 'none';
        });
        }

    });
    
    
    if (scheduleForm) {
        scheduleForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            console.log("Form submitted");

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
                    const carName = carMap[carSelect] || 'Carro não selecionado';
                    const formattedDate = formatDateToBrazilian(startDate);

                    const schedulesBody = document.getElementById("schedulesBody");
                    const newRow = schedulesBody.insertRow();
                    newRow.insertCell(0).textContent = nome;
                    newRow.insertCell(1).textContent = formattedDate;
                    newRow.insertCell(2).textContent = startTime;
                    newRow.insertCell(3).textContent = deliverEndDate;
                    newRow.insertCell(4).textContent = origin;
                    newRow.insertCell(5).textContent = rota;
                    newRow.insertCell(6).textContent = km_initial;
                    newRow.insertCell(7).textContent = carName;
                    

                    overlaySchedule.style.display = 'none';
                    calendarPopupSchedule.style.display = 'none';
                    window.location.href = '/vamoAgenda';

                } else {
                    console.error("Failed to store form data:", response.statusText);
                }
            } catch (error) {
                console.error("Error storing form data:", error);
            }
        });
    } else {
        console.error("scheduleForm not found");
    }
    
    function formatDateToBrazilian(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    /*function loadFormData() {
        const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
        const schedulesBody = document.getElementById("schedulesBody");
        schedulesBody.innerHTML = ''; // Limpa o conteúdo atual da tabela

        schedules.forEach(formData => {
            const newRow = schedulesBody.insertRow();
            newRow.insertCell(0).textContent = formData.nome;
            newRow.insertCell(1).textContent = formatDateToBrazilian(formData.startDate);
            newRow.insertCell(2).textContent = formData.startTime;
            newRow.insertCell(3).textContent = formData.deliverEndDate;
            newRow.insertCell(4).textContent = formData.origin;
            newRow.insertCell(5).textContent = formData.rota;
            newRow.insertCell(6).textContent = formData.km_initial;
            newRow.insertCell(7).textContent = formData.carName;
            
        });

        console.log("Form data loaded", schedules);
        loadFormData();
    }*/
    //loadFormData();

    // Agendamentos Popup
    

document.addEventListener("DOMContentLoaded", function () {
    // Função para preencher o select com os carros
    async function preencherCarSelect() {
        try {
            // Fazendo requisição para a API de carros
            const response = await fetch('/API/infoCarro/carro');
            const carros = await response.json();

            const carSelect = document.getElementById("carSelect");

            // Para cada carro, cria uma opção e adiciona ao select
            carros.forEach(carro => {
                const option = document.createElement("option");
                option.value = carro.i_carro_idcar; // Usa o ID do carro como valor
                option.text = `${carro.s_carro_model} - ${carro.s_carro_plate}`; // Mostra o modelo e placa
                carSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao buscar carros:", error);
        }
    }

    // Chama a função para preencher o select
    preencherCarSelect();
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/agendamentos');
        const agendamentos = await response.json();

        const schedulesBody = document.getElementById('schedulesBody');
        schedulesBody.innerHTML = ''; // Limpa as linhas existentes

        agendamentos.forEach(agendamento => {
            const row = document.createElement('tr');
            
            // Adicione as células da tabela conforme a estrutura da tabela Agenda
            row.innerHTML = `
                <td>${agendamento.id}</td>
                <td>${agendamento.someField1}</td> <!-- Substitua "someField1" com o campo real -->
                <td>${agendamento.someField2}</td> <!-- Substitua "someField2" com o campo real -->
                <!-- Continue com os outros campos -->
            `;

            schedulesBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
    }
});

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

// Chame essa função quando o popup for aberto
document.querySelector('#agendamentosButton').addEventListener('click', loadAgendamentos);