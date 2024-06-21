document.addEventListener('DOMContentLoaded', () => {
    const infoForm = document.querySelector('#infoPopup form');
    const acessoForm = document.querySelector('#acessoPopup form');

    infoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(infoForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/saveInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            alert(result.message);
            infoForm.reset();
            closePopup('infoPopup');
        }).catch(error => {
            console.error('Error:', error);
            alert('Failed to save information.');
        });
    });

    acessoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(acessoForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/saveAcesso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(result => {
            alert(result.message);
            acessoForm.reset();
            closePopup('acessoPopup');
        }).catch(error => {
            console.error('Error:', error);
            alert('Failed to save access.');
        });
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