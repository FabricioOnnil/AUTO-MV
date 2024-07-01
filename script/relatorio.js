document.addEventListener('DOMContentLoaded', () => {
    const tableRefeicoesBody = document.getElementById('table-refeicoes').querySelector('tbody');
    const tableReparosBody = document.getElementById('table-reparos').querySelector('tbody');

    // Simulação de dados de refeições e reparos
    const refeicoes = [
        { descricao: 'Refeição 1', valor: 20.5, data: '2024-06-30', imagem: '/Imagens/nota1.png' },
        { descricao: 'Refeição 2', valor: 15.75, data: '2024-06-29', imagem: '/Imagens/nota2.png' }
    ];

    const reparos = [
        { descricao: 'Reparo 1', valor: 100.0, data: '2024-06-25' },
        { descricao: 'Reparo 2', valor: 50.25, data: '2024-06-27' }
    ];

    // Função para exibir dados nas tabelas
    function exibirDadosNaTabela(data, tableBody, includeHeaders = false) {
        tableBody.innerHTML = ''; // Limpa o conteúdo atual da tabela

        if (includeHeaders) {
            const headers = data.length > 0 ? Object.keys(data[0]) : [];
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                headerRow.innerHTML += `<th>${header}</th>`;
            });
            tableBody.appendChild(headerRow);
        }

        data.forEach(compra => {
            const row = document.createElement('tr');
            if (compra.imagem) {
                row.innerHTML = `
                    <td>${compra.descricao}</td>
                    <td>R$ ${compra.valor.toFixed(2)}</td>
                    <td>${compra.data}</td>
                    <td><img src="${compra.imagem}" alt="Nota Fiscal" width="100"></td>
                `;
            } else {
                row.innerHTML = `
                    <td>${compra.descricao}</td>
                    <td>R$ ${compra.valor.toFixed(2)}</td>
                    <td>${compra.data}</td>
                `;
            }
            tableBody.appendChild(row);
        });
    }

    // Exibir dados de refeições na tabela
    exibirDadosNaTabela(refeicoes, tableRefeicoesBody);

    // Exibir dados de reparos na tabela
    exibirDadosNaTabela(reparos, tableReparosBody);
});

function openTablePopup(tableId) {
    const table = document.getElementById(tableId);
    const tableContent = table.querySelector('tbody').innerHTML;

    // Abre uma nova janela
    const popupWindow = window.open('', '_blank', 'width=800,height=600');

    // Escreve o conteúdo HTML da tabela na nova janela
    popupWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tabela</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table, th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <table>${tableContent}</table>
        </body>
   
