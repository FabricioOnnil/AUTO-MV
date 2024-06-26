import Sequelize from 'sequelize';
import db from './db'; // Importe sua configuração de conexão com o banco de dados

const sequelize = db.sequelize;


const ContratoCarro = sequelize.define('contrato_carro', {
    dataInicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dataTermino: {
        type: Sequelize.DATE,
        allowNull: false
    },
    usuarioResponsavel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigoReserva: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigoAluguel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tarifaContrato: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    kmExcedente: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    distanciaDia: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

app.post('/contratoCarro', (req, res) => {
    ContratoCarro.create({
        dataInicio: req.body.dataInicio,
        dataTermino: req.body.dataTermino,
        usuarioResponsavel: req.body.usuarioResponsavel,
        codigoReserva: req.body.codigoReserva,
        codigoAluguel: req.body.codigoAluguel,
        tarifaContrato: req.body.tarifaContrato,
        kmExcedente: req.body.kmExcedente,
        distanciaDia: req.body.distanciaDia
    }).then(() => {
        res.send("Contrato de carro cadastrado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao cadastrar contrato de carro: " + error);
    });
});

app.put('/contratoCarro/:id', (req, res) => {
    const contratoId = req.params.id;
    ContratoCarro.update({
        dataInicio: req.body.dataInicio,
        dataTermino: req.body.dataTermino,
        usuarioResponsavel: req.body.usuarioResponsavel,
        codigoReserva: req.body.codigoReserva,
        codigoAluguel: req.body.codigoAluguel,
        tarifaContrato: req.body.tarifaContrato,
        kmExcedente: req.body.kmExcedente,
        distanciaDia: req.body.distanciaDia
    }, {
        where: {
            id: contratoId
        }
    }).then(() => {
        res.send("Contrato atualizado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao atualizar contrato: " + error);
    });
});

app.delete('/contratoCarro/:id', (req, res) => {
    const contratoId = req.params.id;
    ContratoCarro.destroy({
        where: {
            id: contratoId
        }
    }).then(() => {
        res.send("Contrato deletado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao deletar contrato: " + error);
    });
});


export default ContratoCarro;