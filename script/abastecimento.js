document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchaseForm');

    purchaseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value;
        const data = document.getElementById('data').value;
        const imagem = document.getElementById('imagem').files[0];

        if (!descricao || !valor || !data || !imagem) {
            alert("Por favor, preencha todos os campos e selecione uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('valor', valor);
        formData.append('data', data);
        formData.append('imagem', imagem);

        fetch('/registrarAbastecimento', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });
});
