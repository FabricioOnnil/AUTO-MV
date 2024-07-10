import express from 'express';
import abastecimento from '../models/abastecimentoData.js';

const abastecimentoRouter = express.Router();

// Rota para obter todos os postos de combustível
abastecimentoRouter.get('/fuelStations', (req, res) => {
  abastecimento.findAll()
    .then(abastecimento => {
      res.json(abastecimento);
    })
    .catch((error) => {
      res.status(500).send("Erro ao obter postos de combustível: " + error.message);
    });
});

// Rota para obter um posto de combustível específico
abastecimentoRouter.get('/abastecimento/:id', (req, res) => {
  const abastecimentoId = req.params.id;
  abastecimento.findByPk(abastecimentoId)
    .then(abastecimento => {
      if (abastecimento) {
        res.json(abastecimento);
      } else {
        res.status(404).send("Posto de combustível não encontrado");
      }
    })
    .catch((error) => {
      res.status(500).send("Erro ao obter posto de combustível: " + error.message);
    });
});

// Rota para cadastrar um posto de combustível
abastecimentoRouter.post('/abastecimento', (req, res) => {
  abastecimento.create(req.body)
    .then(() => {
      res.send("Posto de combustível cadastrado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao cadastrar posto de combustível: " + error.message);
    });
});

// Rota para atualizar informações de um posto de combustível
abastecimentoRouter.put('/abastecimento/:id', (req, res) => {
  const abastecimentoId = req.params.id;
  abastecimento.update(req.body, { where: { idFuel: abastecimentoId } })
    .then(() => {
      res.send("Posto de combustível atualizado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao atualizar posto de combustível: " + error.message);
    });
});

// Rota para deletar um posto de combustível
abastecimentoRouter.delete('/abastecimento/:id', (req, res) => {
  const abastecimentoId = req.params.id;
  abastecimento.destroy({ where: { idFuel: abastecimentoId } })
    .then(() => {
      res.send("Posto de combustível deletado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao deletar posto de combustível: " + error.message);
    });
});

export default abastecimentoRouter;
