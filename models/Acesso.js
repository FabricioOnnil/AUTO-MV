import Sequelize from 'sequelize';
import db from './db';

const sequelize = db.sequelize;

const Acesso = sequelize.define('acesso', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull: false

    },
    password:{
        type:Sequelize.STRING,
        allowNull: false
    },
    licenseDriving:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sectorShipping:{
        type: Sequelize.STRING,
        allowNull: false
    },
    dateExpiration:{
        type: Sequelize.DATE,
        allowNull: false
    }
})

// Rota para cadastrar um acesso
app.post('/acesso', (req, res) => {
    Acesso.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        senha: req.body.senha,
        numeroHabilitacao: req.body.numeroHabilitacao,
        orgaoExpedidor: req.body.orgaoExpedidor,
        validadeHabilitacao: req.body.validadeHabilitacao
    }).then(() => {
        res.send("Acesso cadastrado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao cadastrar acesso: " + error);
    });
});

// Rota para atualizar informações de um acesso
app.put('/acesso/:id', (req, res) => {
    const acessoId = req.params.id;
    Acesso.update({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        senha: req.body.senha,
        numeroHabilitacao: req.body.numeroHabilitacao,
        orgaoExpedidor: req.body.orgaoExpedidor,
        validadeHabilitacao: req.body.validadeHabilitacao
    }, {
        where: {
            id: acessoId
        }
    }).then(() => {
        res.send("Acesso atualizado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao atualizar acesso: " + error);
    });
});

// Rota para deletar um acesso
app.delete('/acesso/:id', (req, res) => {
    const acessoId = req.params.id;
    Acesso.destroy({
        where: {
            id: acessoId
        }
    }).then(() => {
        res.send("Acesso deletado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao deletar acesso: " + error);
    });
});

export default Acesso;
