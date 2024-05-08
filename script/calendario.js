
document.addEventListener("DOMContentLoaded", function() {
    const calendarioBody = document.getElementById("calendarioBody");

    function zeroEsquerda(numero) {
        return numero < 10 ? `0${numero}` : numero;
    }

    // Função para obter o número de dias de um mês em um determinado ano
    function diasNoMes(ano, mes) {
        return new Date(ano, mes + 1, 0).getDate();
    }

    // Preenche o calendário com os dias do mês
    function preencherCalendario(ano, mes) {
        calendarioBody.innerHTML = ''; // Limpa o conteúdo atual do calendário

        const primeiroDiaMes = new Date(ano, mes, 1).getDay(); 
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
                        const diaFormatado = `${ano}-${zeroEsquerda(mes + 1)}-${zeroEsquerda(contadorDia)}`;
                        cell.textContent = contadorDia;
                        cell.dataset.dataAgenda = diaFormatado; // Adiciona o atributo de dataset para o dia
                        
                         // Adiciona evento de clique para mostrar pop-up
                         cell.addEventListener('click', function() {
                            mostrarPopup(diaFormatado); // Função para mostrar pop-up com as informações da agenda
                        });

                        // Verifica se o dia tem evento (adicione sua lógica aqui)
                        const temEvento = verificarEvento(diaFormatado);
                        if (temEvento) {
                            cell.classList.add('has-event'); // Adiciona a classe has-event
                        }

                        contadorDia++;
                    }
                }
            }
        }
    }

    // Função para mostrar o pop-up com informações da agenda para um dia específico
    function mostrarPopup(data) {
        const temEvento = verificarEvento(data);
        
        if (temEvento) {
            // Aqui você pode exibir um pop-up, modal ou janela com as informações do evento
            // Por simplicidade, usaremos um alerta neste exemplo
            alert(`Eventos para o dia ${data}:\n- Evento 1\n- Evento 2\n- Evento 3`);
        } else {
            alert(`Nenhum evento para o dia ${data}`);
        }
    }

    // Função para verificar se um dia tem evento (exemplo simples)
    function verificarEvento(data) {
        // Aqui você pode implementar a lógica para verificar se há um evento para o dia especificado
        // Retorne true se houver evento para o dia, false caso contrário
        // Neste exemplo simples, vamos supor que todos os dias do mês têm eventos
        return true; // Altere para false se nenhum evento estiver presente para o dia
    }
    // Obtém o ano e mês atuais
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth();

    // Chamando a função para preencher o calendário com o mês atual
    preencherCalendario(anoAtual, mesAtual);
});
