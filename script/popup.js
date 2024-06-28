document.addEventListener('DOMContentLoaded', function() {
    const showCalendarButton = document.getElementById('showCalendarSchedule');
    const overlay = document.getElementById('overlaySchedule');
    const calendarPopup = document.getElementById('calendarPopupSchedule');
    const closePopupButton = document.querySelector('.close-popupSchedule');

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
