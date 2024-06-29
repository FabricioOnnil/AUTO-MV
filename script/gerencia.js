document.addEventListener('DOMContentLoaded', () => {
    const contratoForm = document.querySelector('#carPopup form');
    const custoFixoForm = document.querySelector('#custPopup form');
    const infoCarForm = document.querySelector('#infoPopup form');
    const acessoForm = document.querySelector('#acessoPopup form');

    contratoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const formData = new FormData(contratoForm);
    
        try {
            const response = await fetch('/contratoCarro', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Erro ao cadastrar contrato de carro: ${errorMessage}`);
            }
    
            const result = await response.json();
            alert(result.message);
            contratoForm.reset();
            closePopup('carPopup');
        } catch (error) {
            console.error('Erro:', error);
            alert(`Falha ao cadastrar contrato de carro: ${error.message}`);
        }
    });

    custoFixoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const formData = new FormData(custoFixoForm);
    
        try {
            const response = await fetch('/custoFixo', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Erro ao cadastrar custo fixo: ${errorMessage}`);
            }
    
            const result = await response.json();
            alert(result.message);
            custoFixoForm.reset();
            closePopup('custPopup');
        } catch (error) {
            console.error('Erro:', error);
            alert(`Falha ao cadastrar custo fixo: ${error.message}`);
        }
    });

    infoCarForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const formData = new FormData(infoCarForm);
    
        try {
            const response = await fetch('/infoCar', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Erro ao cadastrar informações de carro: ${errorMessage}`);
            }
    
            const result = await response.json();
            alert(result.message);
            infoCarForm.reset();
            closePopup('infoPopup');
        } catch (error) {
            console.error('Erro:', error);
            alert(`Falha ao cadastrar informações de carro: ${error.message}`);
        }
    });

    acessoForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        const formData = new FormData(acessoForm);
            

       try {
            const response = await fetch('/acesso', {
                method: 'POST',                
                body: formData
            });

            const contentType = response.headers.get('content-type');
            if (!response.ok) {
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao salvar o acesso');
                } else {
                    throw new Error('Erro inesperado ao salvar o acesso');
                }
            }

            const result = await response.json();
            alert(result.message);
            acessoForm.reset();
            closePopup('acessoPopup');
        } catch (error) {
            console.error('Error:', error);
            alert(`Falha ao salvar o acesso: ${error.message}`);
        }
    });
});

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function contractRegistration() {
    const contractCheckbox = document.getElementById('contract');
    const contractSections = document.querySelectorAll('.contract-registration');
    contractSections.forEach(section => {
        section.style.display = contractCheckbox.checked ? 'block' : 'none';
    });
}

function fixedCost() {
    const costCheckbox = document.getElementById('cost');
    const fixedCostSections = document.querySelectorAll('.fixed-cost');
    fixedCostSections.forEach(section => {
        section.style.display = costCheckbox.checked ? 'block' : 'none';
    });
}

function registerCar() {
    const carCheckbox = document.getElementById('car');
    const registerCarSections = document.querySelectorAll('.registerCar');
    registerCarSections.forEach(section => {
        section.style.display = carCheckbox.checked ? 'block' : 'none';
    });
}

// Dados de exemplo para preencher a tabela de valores globais
const globalValues = [
    { period: 'all', km: 10000, fuelCost: 5000, fuelAcquired: 2000, fuelUsed: 1800, repairCost: 2000, foodCost: 1000, hoursScheduled: 500, hoursNotScheduled: 300 },
    { period: 'year', km: 2000, fuelCost: 1000, fuelAcquired: 400, fuelUsed: 360, repairCost: 400, foodCost: 200, hoursScheduled: 100, hoursNotScheduled: 60 },
    { period: 'month', km: 500, fuelCost: 250, fuelAcquired: 100, fuelUsed: 90, repairCost: 100, foodCost: 50, hoursScheduled: 25, hoursNotScheduled: 15 },
    { period: 'last15', km: 200, fuelCost: 100, fuelAcquired: 40, fuelUsed: 36, repairCost: 40, foodCost: 20, hoursScheduled: 10, hoursNotScheduled: 6 },
];

function filterValues() {
    const filter = document.getElementById('filter').value;
    const tableBody = document.getElementById('globalValuesTable');
    tableBody.innerHTML = '';  // Limpa a tabela

    const filteredValues = globalValues.filter(value => value.period === filter || filter === 'all');

    filteredValues.forEach(value => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${value.km}</td>
            <td>${value.fuelCost}</td>
            <td>${value.fuelAcquired}</td>
            <td>${value.fuelUsed}</td>
            <td>${value.repairCost}</td>
            <td>${value.foodCost}</td>
            <td>${value.hoursScheduled}</td>
            <td>${value.hoursNotScheduled}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Inicializa a tabela com todos os dados
filterValues();
