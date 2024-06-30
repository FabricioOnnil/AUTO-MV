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


const app = express();
const PORT = process.env.PORT || 8081;
// Configuração para servir arquivos estáticos
app.use(express.static(join(__dirname, '..')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/Imagens', express.static(path.join(__dirname, 'Imagens')));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('AUTO-MV'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/acesso', acessoRoutes);

// Middleware para tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).send('Algo deu errado!');
});

// Definindo __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Configuração do diretório de views
app.set('views', join(__dirname, '..', 'views'));

// Configuração do Template Engine
const templateEngine = create({ defaultLayout: 'main' });
app.engine('handlebars', templateEngine.engine);
app.set('view engine', 'handlebars');

// Rotas para cada tabela

// Rotas para a tabela Acesso
app.use('/API', acessoRoutes);

// Rotas para a tabela ContratoCarro
app.use('/API', contratoCarroRoutes);

// Rotas para a tabela CustosFixos
app.use('/API', custosFixosRoutes);

// Rotas para a tabela InfoCarro
app.use('/API', infoCarroRoutes);

// Rotas para a tabela Food
app.use('/API', foodRoutes);

// Rotas para a tabela FuelStation
app.use('/API', fuelStationRoutes);


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { name: username, password: password }
    });

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).json({ message: 'Erro no servidor. Por favor, tente novamente mais tarde.' });
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


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
