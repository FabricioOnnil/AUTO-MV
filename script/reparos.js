document.addEventListener('DOMContentLoaded', () => {
    const descricaoInput = document.getElementById('descricao');
    const valorInput = document.getElementById('valor');
    const dataInput = document.getElementById('data');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snapButton = document.getElementById('snap');
    const purchaseForm = document.getElementById('purchaseForm');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close');

    let capturedImage = null;

    // Acessar a câmera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("Erro ao acessar a câmera: ", err);
                alert("Erro ao acessar a câmera: " + err.message);
            });
    } else {
        alert("Navegador não suporta acesso à câmera.");
    }

    // Capturar imagem ao clicar no botão "Foto Nota Fiscal"
    snapButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (video.srcObject) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            capturedImage = canvas.toDataURL('image/png');
            modalImage.src = capturedImage;
            modal.style.display = "block";
        } else {
            alert("Câmera não está acessível.");
        }
    });

    // Fechar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Registrar compra ao submeter o formulário
    purchaseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const descricao = descricaoInput.value;
        const valor = valorInput.value;
        const data = dataInput.value;

        if (!descricao || !valor || !data || !capturedImage) {
            alert("Por favor, preencha todos os campos e tire uma foto.");
            return;
        }

        const purchaseData = {
            descricao,
            valor,
            data,
            imagem: capturedImage
        };

        // Aqui você pode armazenar os dados em um banco de dados, enviar para um servidor, etc.
        // Por enquanto, apenas vamos logar os dados no console.
        console.log("Compra registrada: ", purchaseData);

        // Limpar os campos do formulário
        descricaoInput.value = '';
        valorInput.value = '';
        dataInput.value = '';
        capturedImage = null;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        modal.style.display = "none";
    });

    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
