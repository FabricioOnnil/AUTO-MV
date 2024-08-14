import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';
import path, { join } from 'path';
import session from 'express-session'; // Adicionar o middleware de sessão
import db from '../models/db.js';
import sequelize from '../models/db.js';

import abastecimento from '../models/abastecimentoData.js';
import agenda from '../models/agendaData.js';
import agendamento from '../models/agendamentoData.js';
import carroAbastecimento from '../models/carroAbastecimentoData.js';
import carro from '../models/carroData.js';
import contratoCarro from '../models/contratoCarroData.js';
import custosCarro from '../models/custosCarroData.js';
import comida from '../models/comidaData.js';
import diario from '../models/diarioData.js';
import reparo from '../models/reparoData.js';
import usuario from '../models/usuarioData.js';
import usuarioVisita from '../models/usuarioVisitaData.js';
import entrega from '../models/entregaData.js';

import userRouter from '../routes/acessoRoutes.js';
import agendamentoRouter from '../routes/agendamentoRoutes.js';
import agendaRouter from '../routes/agendaRoutes.js';
import carroAbastecimentoRouter from '../routes/carroAbastecimento.js';
import entregaRouter from '../routes/entregaRoutes.js';
import carRouter from '../routes/carroRoutes.js';
import carContract from '../routes/contratoRoutes.js';
import carCosts from '../routes/custosRouter.js';
import diarioRouter from '../routes/diarioRoutes.js';
import comidaRouter from '../routes/foodRoutes.js';
import abstRouter from '../routes/fuelStationRoutes.js';
import reparoRouter from '../routes/reparoRoutes.js';
import usuarioVisitaRouter from '../routes/usuarioVisitaRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de sessão
app.use(session({
  secret: 'seu_segredo_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Defina 'secure' para true em produção com HTTPS
}));

const PORT = process.env.PORT || 3000;

// Definindo __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexão com o banco de dados e sincronização dos modelos
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Conectado com sucesso ao banco de dados!");
    await sequelize.sync();
    console.log("Modelos sincronizados com sucesso!");
  } catch (error) {
    console.error("Falha ao se conectar ao banco de dados ou sincronizar modelos:", error);
  }
})();

// Configuração para servir arquivos estáticos
app.use(express.static(join(__dirname, '..')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/Imagens', express.static(path.join(__dirname, 'Imagens')));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/routes', express.static(path.join(__dirname, 'routes')));
app.use('/models', express.static(path.join(__dirname, 'models')));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`Requisição ${req.method} para ${req.url}`);
  next();
});

// Configuração do diretório de views
app.set('views', join(__dirname, '..', 'views'));

// Rotas para cada tabela
app.use('/API/login', userRouter);
app.use('/API/contratoCarro', carContract);
app.use('/API/custosFixos', carCosts);
app.use('/API/infoCarro', carRouter);
app.use('/API/food', comidaRouter);
app.use('/API/fuelStation', abstRouter);
app.use('/API/agendamento', agendamentoRouter);
app.use('/API/entrega', entregaRouter);

// Rota de login
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await usuario.findOne({
      where: {
        s_usuario_name: name,
        s_usuario_password: password
      }
    });
    console.log('Resultado da consulta:', user);
    
    if (user) {
      req.session.userId = user.i_usuario_user; 
      res.status(200).json('Login bem-sucedido');
    } else {
      res.status(401).json('Credenciais inválidas');
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).json('Erro interno do servidor');
  }
});

// Rota de agenda
app.post('/agenda', async (req, res) => {
  const { nome, startDate, startTime, deliverEndDate, originSelect, rota, km_initial, carSelect } = req.body;

  if (!req.session || !req.session.userId) {
    console.error("Usuário não autenticado ou sessão não inicializada.");
    return res.status(401).send('Usuário não autenticado.');
  }

  const userId = req.session.userId;

  try {
    const carros = await carro.findAll();

    const carMap = {};
    carros.forEach(carro => {
      carMap[`carro${carro.i_carro_idcar}`] = `${carro.s_carro_model} - ${carro.s_carro_plate}`;
    });

    const carName = carMap[carSelect] || 'Carro não selecionado';

    await agenda.create({
      s_agenda_nameSchedule: nome,
      d_agenda_startDate: startDate,
      d_agenda_startTime: startTime,
      d_agenda_deliverEndDate: deliverEndDate,
      s_agenda_originSelect: originSelect,
      i_agenda_startRote: rota,
      i_agenda_kmInitial: km_initial,
      s_agenda_sheduleCar: carName,
      d_agenda_createdAt: new Date(),
      d_agenda_updateAt: new Date(),
      i_agenda_usuario: userId
    });

    res.status(200).send('Formulário recebido com sucesso!');
  } catch (error) {
    console.error("Erro ao receber formulário.", error);
    res.status(500).send('Erro ao armazenar formulário');
  }
});

// Rota de Contrato do Carro
app.post('/contratoCarro', async (req, res) => {
  const { inicioAluguel, terminoAluguel, responsavel, codigo, contrato, tarifaMensal, kmExcendente, franquia } = req.body;

  try {
    const novoContrato = await contratoCarro.create({
      inicioAluguel,
      terminoAluguel,
      responsavel,
      codigo,
      contrato,
      tarifaMensal,
      kmExcendente,
      franquia
    });
    res.status(200).send('Contrato criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar contrato:', error);
    res.status(500).send('Erro ao criar contrato');
  }
});

// Rota de Custos do Carro
app.post('/custosCarro', async (req,res) => {
  const { limiteReparo, reparosOutros, perdaTotal, dataInicio, dataTermino, distanciaLimite } = req.body;

  try {
    const novoCusto = await custosCarro.create({
      limiteReparo,
      reparosOutros,
      perdaTotal,
      dataInicio,
      dataTermino,
      distanciaLimite
    });
    res.status(200).send('Custo registrado com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar custo:', error);
    res.status(500).send('Erro ao registrar custo');
  }
});

// ----------------------------------------------R O T A S------------------------------------------------------------//

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoInicial.html'));
});

// Rotas para servir arquivos HTML estáticos
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

app.get('/vamoInformado', (req, res) => {
  res.sendFile(join(__dirname, '..', 'frontend', 'vamoInformado.html'));
});
// ---------------------------------------------------------------------------------------------------------------//

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
