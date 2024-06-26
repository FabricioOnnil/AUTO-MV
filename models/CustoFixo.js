// ContratoCarro.js

import Sequelize from 'sequelize';
import db from './db';

const sequelize = db.sequelize;

// Definindo o modelo CustosFixos
const CustosFixos = sequelize.define('custos_fixos', {
    damageLimit: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    otherDamage: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    totalLoss: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    insurancePeriod: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    quilometragemInicial: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Rota para cadastrar custos fixos
app.post('/custosFixos', (req, res) => {
    CustosFixos.create({
        damageLimit: req.body.damageLimit,
        otherDamage: req.body.otherDamage,
        totalLoss: req.body.totalLoss,
        insurancePeriod: req.body.insurancePeriod,
        quilometragemInicial: req.body.quilometragemInicial
    }).then(() => {
        res.send("Custos fixos cadastrados com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao cadastrar custos fixos: " + error);
    });
});

app.put('/custosFixos/:id', (req, res) => {
    const custoId = req.params.id;
    CustosFixos.update({
        damageLimit: req.body.damageLimit,
        otherDamage: req.body.otherDamage,
        totalLoss: req.body.totalLoss,
        insurancePeriod: req.body.insurancePeriod,
        quilometragemInicial: req.body.quilometragemInicial
    }, {
        where: {
            id: custoId
        }
    }).then(() => {
        res.send("Contrato atualizado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao atualizar contrato: " + error);
    });
});

app.delete('/contratoCarro/:id', (req, res) => {
    const custoId = req.params.id;
    ContratoCarro.destroy({
        where: {
            id: custoId
        }
    }).then(() => {
        res.send("Contrato deletado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao deletar contrato: " + error);
    });
});

export default CustosFixos;
