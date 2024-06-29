import express from 'express';
import bodyParser from 'body-parser';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path, { join } from 'path';
import db from '../models/db.mjs';
import Acesso from '../models/Acesso.mjs';
import ContratoCarro from '../models/ContratoCarro.mjs';
import CustosFixos from '../models/CustoFixo.mjs';
import infoCarro from '../models/InfoCarro.mjs';
import User from '../models/User.mjs'; // Adicione a importação do modelo User

const app = express();
const PORT = process.env.PORT || 8081;

// Definindo __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Configuração para servir arquivos estáticos
app.use(express.static(join(__dirname, '..')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/Imagens', express.static(path.join(__dirname, 'Imagens')));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// Middleware para tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).send('Algo deu errado!');
});

// Rota para cadastrar um acesso
app.post('/acesso', (req, res) => {
  Acesso.create(req.body)
    .then(() => {
      res.send("Acesso cadastrado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao cadastrar acesso: " + error.message);
    });
});

// Rota para atualizar informações de um acesso
app.put('/acesso/:id', (req, res) => {
  const acessoId = req.params.id;
  Acesso.update(req.body, { where: { id: acessoId } })
    .then(() => {
      res.send("Acesso atualizado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao atualizar acesso: " + error.message);
    });
});

// Rota para deletar um acesso
app.delete('/acesso/:id', (req, res) => {
  const acessoId = req.params.id;
  Acesso.destroy({ where: { id: acessoId } })
    .then(() => {
      res.send("Acesso deletado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao deletar acesso: " + error.message);
    });
});

// Rotas para ContratoCarro
app.post('/contratoCarro', (req, res) => {
  ContratoCarro.create(req.body)
    .then(() => {
      res.send("Contrato de carro cadastrado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao cadastrar contrato de carro: " + error.message);
    });
});

app.put('/contratoCarro/:id', (req, res) => {
  const contratoId = req.params.id;
  ContratoCarro.update(req.body, { where: { id: contratoId } })
    .then(() => {
      res.send("Contrato atualizado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao atualizar contrato: " + error.message);
    });
});

app.delete('/contratoCarro/:id', (req, res) => {
  const contratoId = req.params.id;
  ContratoCarro.destroy({ where: { id: contratoId } })
    .then(() => {
      res.send("Contrato deletado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao deletar contrato: " + error.message);
    });
});

// Rota para cadastrar custos fixos
app.post('/custosFixos', (req, res) => {
  CustosFixos.create(req.body)
    .then(() => {
      res.send("Custos fixos cadastrados com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao cadastrar custos fixos: " + error.message);
    });
});

app.put('/custosFixos/:id', (req, res) => {
  const custoId = req.params.id;
  CustosFixos.update(req.body, { where: { id: custoId } })
    .then(() => {
      res.send("Custos fixos atualizados com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao atualizar custos fixos: " + error.message);
    });
});

app.delete('/custosFixos/:id', (req, res) => {
  const custoId = req.params.id;
  CustosFixos.destroy({ where: { id: custoId } })
    .then(() => {
      res.send("Custos fixos deletados com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao deletar custos fixos: " + error.message);
    });
});

// Rota para cadastrar um carro
app.post('/infoCarro', (req, res) => {
  infoCarro.create(req.body)
    .then(() => {
      res.send("Carro cadastrado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao cadastrar carro: " + error.message);
    });
});

// Rota para atualizar informações de um carro
app.put('/infoCarro/:id', (req, res) => {
  const carroId = req.params.id;
  infoCarro.update(req.body, { where: { id: carroId } })
    .then(() => {
      res.send("Carro atualizado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao atualizar carro: " + error.message);
    });
});

// Rota para deletar um carro
app.delete('/infoCarro/:id', (req, res) => {
  const carroId = req.params.id;
  infoCarro.destroy({ where: { id: carroId } })
    .then(() => {
      res.send("Carro deletado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao deletar carro: " + error.message);
    });
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

// Rotas POST para login

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

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
