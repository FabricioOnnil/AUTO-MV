document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const data = document.getElementById('data').value;
    console.log('Compra Registrada:', { descricao, valor, data });
    alert('Compra registrada com sucesso!');
});


