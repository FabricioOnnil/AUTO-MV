import express from 'express';
import bodyParser from 'body-parser';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import db from '../models/db.mjs';
import acessoRoutes from '../routes/acessoRoutes.mjs';
import contratoCarroRoutes from '../routes/contratoCarroRoutes.mjs';
import custosFixosRoutes from '../routes/custosFixosRoutes.mjs';
import infoCarroRoutes from '../routes/infoCarroRoutes.mjs';
import foodRoutes from '../routes/foodRoutes.mjs';
import fuelStationRoutes from '../routes/fuelStationRoutes.mjs';
import User from '../models/User.mjs'; // Importação direta do modelo User
import Schedule from '../models/Schedule.mjs'; // Importação direta do modelo Schedule

const app = express();
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

// Middleware para parsing do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Conexão com o banco de dados
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado com sucesso ao banco de dados!");
  })
  .catch((error) => {
    console.error("Falha ao se conectar ao banco de dados:", error);
  });

// Configuração do diretório de views
app.set('views', join(__dirname, '..', 'views'));

// Configuração do Template Engine
const templateEngine = create({ defaultLayout: 'main' });
app.engine('handlebars', templateEngine.engine);
app.set('view engine', 'handlebars');

// Rotas para cada tabela
app.use('/API/acesso', acessoRoutes);
app.use('/API/contratoCarro', contratoCarroRoutes);
app.use('/API/custosFixos', custosFixosRoutes);
app.use('/API/infoCarro', infoCarroRoutes);
app.use('/API/food', foodRoutes);
app.use('/API/fuelStation', fuelStationRoutes);

app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        firstName: name,
        secret: password
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
app.post('/submit-schedule', async (req, res) => {
  const { nome, startDate, startTime, originSelect, rota, km_initial, carSelect } = req.body;
  const carMap = {
    carro1: 'MOBI - PPK_1234',
    carro2: 'AUDI - PPX_3456'
  };
  const carName = carMap[carSelect] || 'Carro não selecionado';

  try {
    await Schedule.create({
      nameSchedule: nome,
      scheduleStartDate: startDate,
      startTime: startTime,
      originSelect: originSelect,
      startRote: rota,
      km_initial: km_initial,
      scheduleCar: carName
    });

    res.status(200).send('Form data stored successfully');
  } catch (error) {
    console.error("Error storing form data:", error);
    res.status(500).send('Error storing form data');
  }
});

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

// Middleware para tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).send('Algo deu errado!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
