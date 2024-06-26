import Sequelize from 'sequelize';
import db from './db'; // Importe sua configuração de conexão com o banco de dados

const sequelize = db.sequelize;

// Definição do modelo Carro
const Carro = sequelize.define('carro', {
    nomeCarro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    placa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    anoFabricacao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    capacidadeTanque: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mediaConsumo: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

// Rota para cadastrar um carro
app.post('/infoCarro', (req, res) => {
    Carro.create({
        nomeCarro: req.body.nomeCarro,
        placa: req.body.placa,
        anoFabricacao: req.body.anoFabricacao,
        capacidadeTanque: req.body.capacidadeTanque,
        mediaConsumo: req.body.mediaConsumo
    }).then(() => {
        res.send("Carro cadastrado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao cadastrar carro: " + error);
    });
});

// Rota para atualizar informações de um carro
app.put('/infoCarro/:id', (req, res) => {
    const carroId = req.params.id;
    Carro.update({
        nomeCarro: req.body.nomeCarro,
        placa: req.body.placa,
        anoFabricacao: req.body.anoFabricacao,
        capacidadeTanque: req.body.capacidadeTanque,
        mediaConsumo: req.body.mediaConsumo
    }, {
        where: {
            id: carroId
        }
    }).then(() => {
        res.send("Carro atualizado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao atualizar carro: " + error);
    });
});

// Rota para deletar um carro
app.delete('/infoCarro/:id', (req, res) => {
    const carroId = req.params.id;
    Carro.destroy({
        where: {
            id: carroId
        }
    }).then(() => {
        res.send("Carro deletado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao deletar carro: " + error);
    });
});

export default Carro;
