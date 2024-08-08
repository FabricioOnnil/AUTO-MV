document.addEventListener("DOMContentLoaded", function() {
    const showCalendarButton = document.getElementById('showCalendarSchedule');  
    const showTablePopup = docuyment.getElemetById('showTablePopup'); 
    const overlaySchedule = document.getElementById('overlaySchedule');    
    const calendarPopupSchedule = document.getElementById('calendarPopupSchedule');    
    const closePopupScheduleButton = document.querySelector('.close-popupSchedule');
    const closePopupSchedulesButton = document.querySelector('.close-popupSchedules');    
    const popup = document.getElementById('calendarPopupSchedule');

    console.log("DOM loaded");

    if (showCalendarButton) {
        showCalendarButton.addEventListener('click', function() {
            console.log("Show calendar button clicked");
            overlaySchedule.style.display = 'block';
            calendarPopupSchedule.style.display = 'block';
        });
    } else {
        console.error("showCalendarButton not found");
    }

    if (showTablePopup) {
        showCalendarButton.addEventListener('click', function() {
            console.log("show table button clicked");
            overlaySchedule.style.display = 'block';
            calendarPopupSchedule.style.display = 'block';
        });
    } else {
        console.error("showTableButton not found");
    }

    if (closePopupScheduleButton) {
        closePopupScheduleButton.addEventListener('click', function() {
            console.log("Close popup button clicked");
            overlaySchedule.style.display = 'none';
            calendarPopupSchedule.style.display = 'none';
        });
    } else {
        console.error("closePopupScheduleButton not found");
    }

    if (closePopupSchedulesButton) {
        closePopupSchedulesButton.addEventListener('click', function() {
            console.log("Close schedules popup button clicked");
            overlaySchedules.style.display = 'none';
            schedulesPopup.style.display = 'none';
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

    // Lembrar de Puxar direto banco de dados
    const carMap = {
        carro1: 'MOBI - PPK_1234',
        carro2: 'AUDI - PPX_3456'
    };    
    

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
                const response = await fetch('/submit-agenda', {
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
                    scheduleForm.reset();
                    console.log("Form data stored in database and displayed");
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
    
    function storeFormData(nome, startDate, startTime, deliverEndDate, origin, rota, km_initial, carName) {
        const formData = {
            nome,
            startDate,
            startTime,
            deliverEndDate,
            origin,
            rota,
            km_initial,
            carName
        };

        const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
        schedules.push(formData);
        localStorage.setItem('schedules', JSON.stringify(schedules));
        console.log("Form data stored", formData);
    }

    function formatDateToBrazilian(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function loadFormData() {
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
    }

});

//---Agendamentos

const showTableButton = document.getElementById('showTablePopup');
const overlayTable = document.getElementById('overlayTable');
const tablePopup = document.getElementById('tablePopup');


showTableButton.addEventListener('click', function() {
    overlayTable.style.display = 'block';
    tablePopup.style.display = 'block';
});

const closeTableButton = tablePopup.querySelector('.close-popup');
closeTableButton.addEventListener('click', function() {
    overlayTable.style.display = 'none';
    tablePopup.style.display = 'none';
});