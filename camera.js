// Acessar a câmera ------------------------------------------------------
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        const video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
    })
    .catch(function(error) {
        console.error("Não foi possível acessar a câmera", error);
    });

document.getElementById('snap').addEventListener('click', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 320, 240);
});