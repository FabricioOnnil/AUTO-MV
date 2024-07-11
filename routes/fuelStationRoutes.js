import express from 'express';
import abastecimento from '../models/abastecimentoData.js';

const abstRouter = express.Router();

// Rota para obter todos os postos de abastecimento
abstRouter.get('/fuelStations', (req, res) => {
  abastecimento.findAll()
    .then(abastecimento => {
      res.json(abastecimento);
    })
    .catch((error) => {
      res.status(500).send("Erro ao obter abastecimentos: " + error.message);
    });
});

// Rota para obter um  abastecimento pelo ID
abstRouter.get('/abastecimento/:id', (req, res) => {
  const abastecimentoId = req.params.id;
  abastecimento.findOne({ where: { i_abastecimento_idFuel: abastecimentoId }})
    .then(abastecimento => {
      if (!abastecimento) {
        res.status(404).send("abastecimento não encontrado");
        
      } else {
        res.json(abastecimento);
      }
    })
    .catch((error) => {
      res.status(500).send("Erro ao obter  abastecimento: " + error.message);
    });
});

// Rota para cadastrar um  novo abastecimento
abstRouter.post('/abastecimento', (req, res) => {
  abastecimento.create(req.body)
  .then(() => res.send("abasteciento cadastrado com sucesso!"))
  .catch((error) => res.status(500).send("Erro ao cadastrar abastecimento: " + error.message));
});

// Rota para atualizar  um  abastecimento pelo ID.
abstRouter.put('/abastecimento/:id', (req, res) => {
  const abastecimentoId = req.params.id;
  abastecimento.update(req.body, { where: { i_abasteciemnto_idFuel: abastecimentoId } })
  .then(() => res.send("abastecimento atualizado com sucesso!"))
  .catch((error) => res.status(500).send("Erro ao atualizar abastecimento: " + error.message));
});

// Rota para deletar um  abastecimento
abstRouter.delete('/abastecimento/:id', (req, res) => {
  const abastecimentoId = req.params.id;
  abastecimento.destroy({ where: { i_abastecimento_idFuel: abastecimentoId } })
  .then(() => res.send("abastecimento deletado com sucesso!"))
  .catch((error) => res.status(500).send("Erro ao deletar abastecimento: " + error.message));
});

export default abstRouter;
