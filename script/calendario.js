document.addEventListener("DOMContentLoaded", function() {
    const calendarBody = document.getElementById('calendarioBody');
    const currentMonthSpan = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const popupContainer = document.getElementById('popup-containerTwo'); 
    const closeButton = document.querySelector('.close-popup');

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    closeButton.addEventListener('click', function() {
        popupContainer.style.display = 'none';
    });

    function updateMonthYearDisplay() {
        currentMonthSpan.textContent = `${currentDate.toLocaleString('pt-BR', { month: 'long' })} ${currentYear}`;
    }

    function hasEvents(day, month, year) {
        return day % 2 === 0; // Exemplo: dias pares têm eventos
    }

    function showPopup(day, month, year) {
        popupContainer.style.display = 'block';
        console.log(`Mostrando eventos para ${day}/${month + 1}/${year}`);
    }

    function fillCalendar(month, year) {
        calendarBody.innerHTML = '';
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let row = calendarBody.insertRow();
        for (let i = 0; i < firstDayOfMonth; i++) {
            row.insertCell();
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (row.cells.length === 7) {
                row = calendarBody.insertRow();
            }
            const cell = row.insertCell();
            cell.textContent = day;
            if (hasEvents(day, month, year)) {
                cell.classList.add('has-event');
                cell.addEventListener('click', () => showPopup(day, month, year));
            }
            if (day === currentDay && month === currentMonth && year === currentYear) {
                cell.classList.add('today');
            }
        }

        updateMonthYearDisplay();
    }

    prevMonthBtn.addEventListener('click', function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        currentDate = new Date(currentYear, currentMonth, 1);
        fillCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        currentDate = new Date(currentYear, currentMonth, 1);
        fillCalendar(currentMonth, currentYear);
    });

    fillCalendar(currentMonth, currentYear); // Chama inicialmente para o mês atual
});

