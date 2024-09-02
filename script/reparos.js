document.addEventListener('DOMContentLoaded', () => {
    const descricaoInput = document.getElementById('descricao');
    const valorInput = document.getElementById('valor');
    const dataInput = document.getElementById('data');
    const purchaseForm = document.getElementById('purchaseForm');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close');
  
    

    // Fechar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // Registrar compra ao submeter o formulário
    purchaseForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Formulário submetido");

        
        const descricao = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value;
        const data = document.getElementById('data').value;
        const imagemRep = document.getElementById('imagem').file[0];


        if (!descricao || !valor || !data || !imagemRep) {
            alert("Por favor, preencha todos os campos e selecione uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('carro', valor);
        formData.append('data', data);
        formData.append('imagem', imagemRep);
        
        try {
            const response = await fetch('/reparo', {
                method: 'POST',
                body: formData
            });

        if (response.ok) {
            const data = await response.json();
            console.log("Resposta do servidor:", data);
            alert("Abastecimento registrado com sucesso!");

            purchaseForm.reset();
        } else {
            throw new Error('Erro ao registrar o reparo.');
        }
        } catch (error) {
            console.error('Erro', error);
            alert('Erro ao registrar o reparo. Por favor, tente novamente.');
        }
    });
        console.log("Reparo registrada: ", purchaseData);

        // Limpar os campos do formulário
        descricaoInput.value = '';
        valorInput.value = '';
        dataInput.value = '';
        imagemRep = null;
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

