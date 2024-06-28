document.addEventListener("DOMContentLoaded", function() {
    const showCalendarButton = document.getElementById('showCalendarSchedule');
    const showSchedulesButton = document.getElementById('showSchedulesButton');
    const overlaySchedule = document.getElementById('overlaySchedule');
    const overlaySchedules = document.getElementById('overlaySchedules');
    const calendarPopupSchedule = document.getElementById('calendarPopupSchedule');
    const schedulesPopup = document.getElementById('schedulesPopup');
    const closePopupScheduleButton = document.querySelector('.close-popupSchedule');
    const closePopupSchedulesButton = document.querySelector('.close-popupSchedules');
    const scheduleForm = document.getElementById("scheduleFormSchedule");

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

    if (showSchedulesButton) {
        showSchedulesButton.addEventListener('click', function() {
            console.log("Show schedules button clicked");
            overlaySchedules.style.display = 'block';
            schedulesPopup.style.display = 'block';
            loadFormData();
        });
    } else {
        console.error("showSchedulesButton not found");
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

    if (overlaySchedules) {
        overlaySchedules.addEventListener('click', function() {
            console.log("Overlay clicked");
            overlaySchedules.style.display = 'none';
            schedulesPopup.style.display = 'none';
        });
    } else {
        console.error("overlaySchedules not found");
    }

    const carMap = {
        carro1: 'MOBI - PPK_1234',
        carro2: 'AUDI - PPX_3456'
    };

    function storeFormData(nome, startDate, startTime, origem, rota, km_initial, carName) {
        const formData = {
            nome,
            startDate,
            startTime,
            origem,
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

    if (scheduleForm) {
        scheduleForm.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Form submitted");

            const nome = document.getElementById("nome").value;
            const startDate = document.getElementById("startDate").value;
            const startTime = document.getElementById("startTime").value;
            const origem = document.getElementById("originSelect").value; 
            const rota = document.getElementById("rota").value;
            const km_initial = document.getElementById("km_initial").value;
            const carSelect = document.getElementById("carSelect").value;
            const carName = carMap[carSelect] || 'Carro não selecionado';

            storeFormData(nome, startDate, startTime, origem, rota, km_initial, carName);

            const formattedDate = formatDateToBrazilian(startDate);

            const schedulesBody = document.getElementById("schedulesBody");
            const newRow = schedulesBody.insertRow();
            newRow.insertCell(0).textContent = nome;
            newRow.insertCell(1).textContent = formattedDate;
            newRow.insertCell(2).textContent = startTime;
            newRow.insertCell(3).textContent = origem;
            newRow.insertCell(4).textContent = rota;
            newRow.insertCell(5).textContent = km_initial;
            newRow.insertCell(6).textContent = carName;

            overlaySchedule.style.display = 'none';
            calendarPopupSchedule.style.display = 'none';
            scheduleForm.reset();
        });
    } else {
        console.error("scheduleForm not found");
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
            newRow.insertCell(3).textContent = formData.origem;
            newRow.insertCell(4).textContent = formData.rota;
            newRow.insertCell(5).textContent = formData.km_initial;
            newRow.insertCell(6).textContent = formData.carName;
        });

        console.log("Form data loaded", schedules);
    }

});
