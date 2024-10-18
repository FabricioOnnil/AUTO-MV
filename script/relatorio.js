document.addEventListener('DOMContentLoaded', () => {
    const tableRefeicoesBody = document.getElementById('table-refeicoes').querySelector('tbody');
    const tableReparosBody = document.getElementById('table-reparos').querySelector('tbody');
    const tableAbastecimentoBody = document.getElementById('table-abastecimento').querySelector('tbody');

    // Simulação de dados de refeições e reparos
    function exibirDadosNaTabela(data, tableBody, includeHeaders = false) {
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            if (item.imagem) {
                row.innerHTML = `
                    <td>${item.descricao}</td>
                    <td>R$ ${item.valor.toFixed(2)}</td>
                    <td>${item.data}</td>
                    <td><img src="${item.imagem}" alt="Nota Fiscal" width="100"></td>
                `;
            } else {
                row.innerHTML = `
                    <td>${item.descricao}</td>
                    <td>R$ ${item.valor.toFixed(2)}</td>
                    <td>${item.data}</td>
                `;
            }
            tableBody.appendChild(row);
        });
    }

    // Fetch e exibição de refeições (comida) na tabela
    fetch('/api/refeicoes')
        .then(response => response.json())
        .then(data => exibirDadosNaTabela(data, tableRefeicoesBody))
        .catch(error => console.error('Erro ao buscar refeições:', error));

    // Fetch e exibição de reparos na tabela
    fetch('/api/reparos')
        .then(response => response.json())
        .then(data => exibirDadosNaTabela(data, tableReparosBody))
        .catch(error => console.error('Erro ao buscar reparos:', error));

    // Fetch e exibição de abastecimentos na tabela
    fetch('/api/abastecimentos')
        .then(response => response.json())
        .then(data => exibirDadosNaTabela(data, tableAbastecimentoBody))
        .catch(error => console.error('Erro ao buscar abastecimentos:', error));
});

function openTablePopup(tableId) {
    const table = document.getElementById(tableId);
    const tableContent = table.querySelector('tbody').innerHTML;

    // Abre uma nova janela
    const popupWindow = window.open('', '_blank', 'width=800,height=600');

    // Escreve o conteúdo HTML da tabela na nova janela
    popupWindow.document.write(`
        <html>
        <head><title>Tabela de ${tableId}</title></head>
        <body>
            <table>
                ${tableContent}
            </table>
        </body>
        </html>
    `);
    popupWindow.document.close();
}