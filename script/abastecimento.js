document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchaseForm');

    purchaseForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Form submitted contract");

        const descricao = document.getElementById('descricao').value;
        const carro = document.getElementById('carro').value;
        const valor = document.getElementById('valor').value;
        const pLitro = document.getElementById('pLitro').value;
        const data = document.getElementById('data').value;
        const imagem = document.getElementById('imagem').files[0];

        if (!descricao || !carro || !valor || !pLitro || !data || !imagem) {
            alert("Por favor, preencha todos os campos e selecione uma imagem.");
            return;
        }

        const Qtda = (valor/pLitro);

        const formAbast ={ descrição, carro, valor, pLitro, data, imagem, Qtda };
       

        fetch('/abastecimento', {
            method: 'POST',
            body: formAbast
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });
});
