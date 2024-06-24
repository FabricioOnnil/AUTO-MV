document.addEventListener('DOMContentLoaded', function() {
    const showCalendarButton = document.getElementById('showCalendarAgenda');
    const overlay = document.getElementById('overlayAgenda');
    const calendarPopup = document.getElementById('calendarPopupAgenda');
    const closePopupButton = document.querySelector('.close-popupAgenda');

    showCalendarButton.addEventListener('click', function() {
        overlay.style.display = 'block';
        calendarPopup.style.display = 'block';
    });

    closePopupButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        calendarPopup.style.display = 'none';
    });

    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
        calendarPopup.style.display = 'none';
    });
});
