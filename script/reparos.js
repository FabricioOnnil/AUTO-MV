document.addEventListener('DOMContentLoaded', () => {
    const descricaoInput = document.getElementById('descricao');
    const valorInput = document.getElementById('valor');
    const dataInput = document.getElementById('data');
    const imagemInput = document.getElementById('imagem');
    const purchaseForm = document.getElementById('purchaseForm');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close');  
    

    // Fechar modal
    if(closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
    
        });
    }

    // Registrar compra ao submeter o formulário
    purchaseForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Formulário submetido");

        
        const descricao = descricaoInput.value;
        const valor = valorInput.value;
        const data = dataInput.value;
        const imagemRep = imagemInput.files[0];


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
                alert("Reparo registrado com sucesso!");

                purchaseForm.reset();
                modal.style.display = "none";
        } else {
            const errorData = await response.text();  // Obter a mensagem de erro
            console.error('Erro ao registrar o reparo:', errorData);
            alert('Erro ao registrar o reparo. Por favor, tente novamente.');
        }
        } catch (error) {
            console.error('Erro', error);
            alert('Erro ao registrar o reparo. Por favor, tente novamente.');
        }
    });
        console.log("Reparo registrada: ", purchaseData);
    });

    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

