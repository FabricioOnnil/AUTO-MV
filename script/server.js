import express from 'express';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import cors from 'cors';
import path, { join } from 'path';
import db from '../models/db.mjs';

import abastecimento from '../models/abastecimentoData.mjs';
import agenda from '../models/agendaData.mjs';
import agendamento from '../models/agendamentoData.mjs';
import carroAbastecimento from '../models/carroAbastecimentoData.mjs';
import carro from '../models/carroData.mjs';
import comida from '../models/comidaData.mjs';
import diario from '../models/diario.mjs';
import reparo from '../models/reparoData.mjs';
import usuario from '../models/usuarioData.mjs'; 
import usuarioVisita from '../models/usuarioVisitaData.mjs';

import userRouter from '../routes/acessoRoutes.mjs';
import agendamentoRouter from '../routes/agendamentoRoutes.mjs';
import agendaRouter from '../routes/agendaRoutes.mjs';
import carroAbastecimentoRouter from '../routes/carroAbastecimento.mjs';
import carRouter from '../routes/carroRoutes.mjs';
import carContract from '../routes/contratoRoutes.mjs';
import carCosts from '../routes/custosRouter.mjs';
import diarioRouter from '../routes/diarioRoutes.mjs';
import comidaRouter from '../routes/foodRoutes.mjs';
import abstRouter from '../routes/fuelStationRoutes.mjs';
import reparoRouter from '../routes/reparoRoutes.mjs';
import usuarioVisitaRouter from '../routes/usuarioVisitaRoutes.mjs';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8081;

// Definindo __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração para servir arquivos estáticos
app.use(express.static(join(__dirname, '..')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/Imagens', express.static(path.join(__dirname, 'Imagens')));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/routes', express.static(path.join(__dirname, 'routes')));
app.use('/models', express.static(path.join(__dirname, 'models')));

// Middleware para parsing do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Conexão com o banco de dados e sincronização dos modelos
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Conectado com sucesso ao banco de dados!");
    await db.sequelize.sync();
    console.log("Modelos sincronizados com sucesso!");
  } catch (error) {
    console.error("Falha ao se conectar ao banco de dados ou sincronizar modelos:", error);
  }
})();

// Configuração do diretório de views
app.set('views', join(__dirname, '..', 'views'));

// Configuração do Template Engine
const templateEngine = create({ defaultLayout: 'main' });
app.engine('handlebars', templateEngine.engine);
app.set('view engine', 'handlebars');

// Rotas para cada tabela
app.use('/API/acesso', userRouter);
app.use('/API/contratoCarro', carContract);
app.use('/API/custosFixos', carCosts);
app.use('/API/infoCarro', carRouter);
app.use('/API/food', comidaRouter);
app.use('/API/fuelStation', abstRouter);
app.use('/API/agendamento', agendamentoRouter);

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

    if (user) {
      // Usuário encontrado, autenticação bem-sucedida
      res.status(200).send('Login bem-sucedido');
    } else {
      // Usuário não encontrado, autenticação falhou
      res.status(401).send('Credenciais inválidas');
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.post('/submit-agenda', async (req, res) => {
  const { nome, startDate, startTime, originSelect, rota, km_initial, carSelect } = req.body;

  try {
    const carros = await carro.findAll();

    const carMap = {};
    carros.forEach(carro => {
      carMap[`carro${carro.i_carro_idcar}`] = `${carro.s_carro_model} - ${carro.s_carro_plate}`;
    });

    const carName = carMap[carSelect] || 'Carro não selecionado';

    await agenda.create({
      nameagenda: nome,
      agendaStartDate: startDate,
      startTime: startTime,
      originSelect: originSelect,
      startRote: rota,
      km_initial: km_initial,
      agendaCar: carName
    });

    res.status(200).send('Formulário recebido com sucesso!');
  } catch (error) {
    console.error("Erro ao receber formulário.", error);
    res.status(500).send('Erro ao armazenar formulário');
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

// Middleware para tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).send('Algo deu errado!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
