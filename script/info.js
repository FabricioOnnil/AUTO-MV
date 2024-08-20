function abrirPopup(url) {
    window.open(url, '_blank', 'width=800,height=600');
}

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}