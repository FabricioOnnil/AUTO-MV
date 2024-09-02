
document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchaseForm');

    purchaseForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Formulário submetido");


        const descricao = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value;
        const data = document.getElementById('data').value;
        const imagemAli = document.getElementById('imagem').files[0];

        if (!descricao || !valor || !data || !imagemAli) {
            alert("Por favor, preencha todos os campos e selecione uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('valor', valor);
        formData.append('data', data);
        formData.append('imagem', imagemAli);


        try {
            const response = await fetch('/comida', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Resposta do servidor:", data);
            alert("Refeição registrado com sucesso!");

            purchaseForm.requestFullscreen();
            } else {
                throw new Error ('Erro ao registrar o refeição.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert ('Erro ao registrar o refeição. Por favor, tente novamente.');
        }
    });
});

