document.addEventListener("DOMContentLoaded", function() {
    const showCalendarButton = document.getElementById('showCalendarAgenda');
    const overlay = document.getElementById('overlayAgenda');
    const calendarPopup = document.getElementById('calendarPopupAgenda');
    const closePopupButton = document.querySelector('.close-popupAgenda');
    const scheduleForm = document.getElementById("scheduleFormAgenda");

    console.log("DOM loaded");

    if (showCalendarButton) {
        showCalendarButton.addEventListener('click', function() {
            console.log("Show calendar button clicked");
            overlay.style.display = 'block';
            calendarPopup.style.display = 'block';
        });
    } else {
        console.error("showCalendarButton not found");
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', function() {
            console.log("Close popup button clicked");
            overlay.style.display = 'none';
            calendarPopup.style.display = 'none';
        });
    } else {
        console.error("closePopupButton not found");
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            console.log("Overlay clicked");
            overlay.style.display = 'none';
            calendarPopup.style.display = 'none';
        });
    } else {
        console.error("overlay not found");
    }

    const carMap = {
        carro1: 'MOBI - PPK_1234',
        carro2: 'AUDI - PPX_3456'
    };

    function storeFormData(nome, startDate, origem, carName) {
        const formData = {
            nome,
            startDate,
            origem,
            carName
        };
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.push(formData);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
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
            const origem = document.getElementById("originSelect").value; 
            const carSelect = document.getElementById("carSelect").value;
            const carName = carMap[carSelect] || 'Carro não selecionado';

            storeFormData(nome, startDate, origem, carName);

            const formattedDate = formatDateToBrazilian(startDate);

            const agendamentosBody = document.getElementById("agendamentosBody");
            const newRow = agendamentosBody.insertRow();
            newRow.insertCell(0).textContent = nome;
            newRow.insertCell(1).textContent = formattedDate;
            newRow.insertCell(2).textContent = origem;
            newRow.insertCell(3).textContent = carName;

            overlay.style.display = 'none';
            calendarPopup.style.display = 'none';
            scheduleForm.reset();
        });
    } else {
        console.error("scheduleForm not found");
    }

    function loadFormData() {
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        const agendamentosBody = document.getElementById("agendamentosBody");

        agendamentos.forEach(formData => {
            const newRow = agendamentosBody.insertRow();
            newRow.insertCell(0).textContent = formData.nome;
            newRow.insertCell(1).textContent = formatDateToBrazilian(formData.startDate);
            newRow.insertCell(2).textContent = formData.origem;
            newRow.insertCell(3).textContent = formData.carName;
        });

        console.log("Form data loaded", agendamentos);
    }

    loadFormData();
});
