import express from 'express';
import bodyParser from 'body-parser';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import db from '../models/db.js';
import Acesso from '../models/Acesso.js';
import ContratoCarro from '../models/ContratoCarro.js'
import CustosFixos from '../models/CustoFixo.js';
import infoCarro from '../models/InfoCarro.js';


const app = express();
const PORT = process.env.PORT || 8081;

// Definindo __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//bodyParser
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());



db.sequelize.authenticate().then(function() {
    console.log("Conectado com sucesso!");
}).catch(function(erro) {
    console.log("Falha ao se conectar: " + erro);
});

// Configuração do diretório de views
app.set('views', join(__dirname, '..', 'views'));

// Configuração do Template Engine
const templateEngine = create({ defaultLayout: 'main' });
app.engine('handlebars', templateEngine.engine);
app.set('view engine', 'handlebars');

// Configuração para servir arquivos estáticos
app.use(express.static(join(__dirname, '..'))); 


// Rota para cadastrar um acesso------------------------------------------------------------------
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


// Rotas para ContratoCarro------------------------------------------------------------------------
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

// Rota para cadastrar custos fixos-------------------------------------------------------------------
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


// Rota para cadastrar um carro-----------------------------------------------------------------------
app.post('/infoCarro', (req, res) => {
    infoCarro.create({
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
    infoCarro.update({
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
    infoCarro.destroy({
        where: {
            id: carroId
        }
    }).then(() => {
        res.send("Carro deletado com sucesso!");
    }).catch((error) => {
        res.status(500).send("Erro ao deletar carro: " + error);
    });
});



// ROTAS para servir arquivos HTML estáticos

app.get('/cad', (req, res) => {
    res.render('formulario');
})
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoIndex.html'));
});

app.get('/vamoInicial', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoInicial.html'));
});

app.get('/vamoLogin', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoLogin.html'));
});

app.get('/vamoCalendario', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoCalendario.html'));
});

app.get('/vamoDashboard', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoDashboard.html'));
});

app.get('/vamoAgenda', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoAgenda.html'));
});

app.get('/vamoEntrega', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoEntrega.html'));
});

app.get('/vamoRefeicao', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoRefeicao.html'));
});

app.get('/vamoAbastecimento', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoAbastecimento.html'));
});

app.get('/vamoRelatorio', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoRelatorio.html'));
});

app.get('/vamoReparos', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoReparos.html'));
});

app.get('/vamoGerencia', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoGerencia.html'));
});

app.get('/vamoMapa', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'vamoMapa.html'));
});




//-----------------------------------------------

app.listen(8081, function() {
    console.log("Servidor aberto na url http://localhost:8081");
});
