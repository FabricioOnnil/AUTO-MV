
document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchaseForm');

    purchaseForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Formulário submetido");


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


        try {
            const response = await fetch('/comida', {
            method: 'POST',
            body: formData
        });

        const contentType = response.headers.get("content-type");

        /*if (response.ok) {
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json(); // Apenas tenta fazer o parse se for JSON
                console.log("Resposta do servidor (JSON):", data);
                alert("Refeição registrada com sucesso!");
                window.location.href = "/vamoEntrega";
            } else {
                const text = await response.text(); // Caso contrário, trata como texto
                console.log("Resposta do servidor (Texto):", text);
                alert("Refeição registrada com sucesso!");
            }

            purchaseForm.reset();

            window.location.href = "/vamoEntrega";

            } else {
                throw new Error ('Erro ao registrar o refeição.');
            }
                 } catch (error) {
            console.error('Erro:', error);
            alert ('Erro ao registrar o refeição. Por favor, tente novamente.');
        }*/               
        if (response.ok) {
            const data = contentType && contentType.includes("application/json") ? await response.json() : await response.text();
            alert("Refeição registrada com sucesso!");
            window.location.href = "/vamoEntrega";
        } else {
            throw new Error('Erro ao registrar a refeição.');
        }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao registrar a refeição. Por favor, tente novamente.');
        } finally {
            event.target.querySelector('button').disabled = false; // Habilitar o botão novamente
        }
    });
                
       
});


