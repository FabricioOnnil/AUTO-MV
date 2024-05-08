document.addEventListener("DOMContentLoaded", function() {
    const calendarioBody = document.getElementById("calendarioBody");

    // Função para obter o número de dias de um mês em um determinado ano
    function diasNoMes(ano, mes) {
        return new Date(ano, mes + 1, 0).getDate();
    }

    function zeroEsquerda(numero) {
        return numero < 10 ? `0${numero}` : numero;
    }

    // Preenche o calendário com os dias do mês
    function preencherCalendario(ano, mes) {
        calendarioBody.innerHTML = ''; // Limpa o conteúdo atual do calendário

        const primeiroDiaMes = new Date(ano, mes, 1).getDay(); // Dia da semana do primeiro dia do mês
        const numeroDiasMes = diasNoMes(ano, mes);
        
        let contadorDia = 1; // Contador para os dias do mês

        // Cria as células da tabela para cada semana
        for (let semana = 0; semana < 6; semana++) {
            const row = calendarioBody.insertRow();

            for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
                const cell = row.insertCell();

                // Preenche os dias do mês nas células correspondentes aos dias da semana
                if ((semana === 0 && diaSemana >= primeiroDiaMes) || semana > 0) {
                    if (contadorDia <= numeroDiasMes) {
                        cell.textContent = contadorDia;
                        contadorDia++;
                    }
                }
            }
        }
    }

    // Obtém o ano e mês atuais
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth();

    // Chamando a função para preencher o calendário com o mês atual
    preencherCalendario(anoAtual, mesAtual);
});