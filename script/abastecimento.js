document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchaseForm');

    purchaseForm.addEventListener('submit', async function (event) {
        event.preventDefault();  // Prevenir o envio padrão do formulário
        console.log("Formulário submetido");

        const descricao = document.getElementById('descricao').value;
        const carro = document.getElementById('carro').value;
        const valor = document.getElementById('valor').value;
        const pLitro = document.getElementById('pLitro').value;
        const data = document.getElementById('data').value;
        const imagem = document.getElementById('imagem').files[0];

        // Verificar se todos os campos estão preenchidos
        if (!descricao || !carro || !valor || !pLitro || !data || !imagem) {
            alert("Por favor, preencha todos os campos e selecione uma imagem.");
            return;
        }

        // Calculando a quantidade
        const Qtda = (valor / pLitro);

        // Criando um FormData para enviar arquivos
        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('carro', carro);
        formData.append('valor', valor);
        formData.append('pLitro', pLitro);
        formData.append('data', data);
        formData.append('imagem', imagem);
        formData.append('Qtda', Qtda);

        // Enviando o formulário usando fetch
        try {
            const response = await fetch('/abastecimento', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Resposta do servidor:", data);
                alert("Abastecimento registrado com sucesso!");
                purchaseForm.reset();  // Limpar o formulário após o sucesso
            } else {
                throw new Error('Erro ao registrar o abastecimento.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao registrar o abastecimento. Por favor, tente novamente.');
        }
    });
});

