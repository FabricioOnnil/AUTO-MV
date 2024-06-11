document.addEventListener("DOMContentLoaded", function() {
    const calendarBody = document.getElementById('calendarioBody');
    const currentMonthSpan = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const popupContainer = document.getElementById('popup-containerTwo');
    const closeButton = document.querySelector('.close-popup');
    const eventDetails = document.getElementById('eventDetails');

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    closeButton.addEventListener('click', function() {
        popupContainer.style.display = 'none';
    });

    function updateMonthYearDisplay() {
        currentMonthSpan.textContent = `${currentDate.toLocaleString('pt-BR', { month: 'long' })} ${currentYear}`;
    }

    function getEventsForDay(day, month, year) {
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        return agendamentos.filter(agendamento => {
            const agendamentoDate = new Date(agendamento.startDate);
            return agendamentoDate.getDate() === day && agendamentoDate.getMonth() === month && agendamentoDate.getFullYear() === year;
        });
    }

    function showPopup(day, month, year) {
        popupContainer.style.display = 'block';
        const events = getEventsForDay(day, month, year);

        if (events.length > 0) {
            eventDetails.innerHTML = events.map(event => `<p><strong>Nome:</strong> ${event.nome}<br><strong>Rota:</strong> ${event.rota}</p>`).join('');
        } else {
            eventDetails.innerHTML = "<p>Não há eventos para este dia.</p>";
        }
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

            const events = getEventsForDay(day, month, year);
            if (events.length > 0) {
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
