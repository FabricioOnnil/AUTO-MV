document.addEventListener('DOMContentLoaded', () => {
    const tableRefeicoesBody = document.getElementById('table-refeicoes').querySelector('tbody');
    const tableReparosBody = document.getElementById('table-reparos').querySelector('tbody');

    // Recuperar e exibir dados de refeições
    const refeicoes = JSON.parse(localStorage.getItem('refeicoes')) || [];
    refeicoes.forEach(compra => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${compra.descricao}</td>
            <td>${compra.valor}</td>
            <td>${compra.data}</td>
            <td><img src="${compra.imagem}" alt="Nota Fiscal" width="100"></td>
        `;
        tableRefeicoesBody.appendChild(row);
    });

    // Recuperar e exibir dados de reparos
    const reparos = JSON.parse(localStorage.getItem('reparos')) || [];
    reparos.forEach(compra => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${compra.descricao}</td>
            <td>${compra.valor}</td>
            <td>${compra.data}</td>
        `;
        tableReparosBody.appendChild(row);
    });
});
