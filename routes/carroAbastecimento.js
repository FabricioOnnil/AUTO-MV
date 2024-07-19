import express from 'express';
import carroAbastecimento from '../models/carroAbastecimentoData.js';

const carroAbastecimentoRouter = express.Router();

// Rota para obter todos os carroAbastecimento
carroAbastecimentoRouter.get('/carroAbastecimento', (req, res) => {
    carroAbastecimento.findAll()
      .then(carroAbastecimento => {
        res.json(carroAbastecimento);
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter carroAbastecimento: " + error.message);
      });
  });
  
  // Rota para obter um  carroAbastecimento pelo ID
  carroAbastecimentoRouter.get('/carroAbastecimento/:id', (req, res) => {
    const carroAbastecimentoId = req.params.id;
    carroAbastecimento.findOne({ where: { i_carroAbastecimento_id: carroAbastecimentoId }})
      .then(carroAbastecimento => {
        if (!carroAbastecimento) {
          res.status(404).send("carroAbastecimento não encontrado");
          
        } else {
          res.json(carroAbastecimento);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter  carroAbastecimento: " + error.message);
      });
  });
  
  // Rota para cadastrar um  novo carroAbastecimento
  carroAbastecimentoRouter.post('/carroAbastecimento', (req, res) => {
    carroAbastecimento.create(req.body)
    .then(() => res.send("carroAbastecimento cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar carroAbastecimento: " + error.message));
  });
  
  // Rota para atualizar  um carroAbastecimento pelo ID.
  carroAbastecimentoRouter.put('/carroAbastecimento/:id', (req, res) => {
    const carroAbastecimentoId = req.params.id;
    carroAbastecimento.update(req.body, { where: { i_carroAbastecimento_id: carroAbastecimentoId } })
    .then(() => res.send("carroAbastecimento atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar carroAbastecimento: " + error.message));
  });
  
  // Rota para deletar um  carroAbastecimento
  carroAbastecimentoRouter.delete('/carroAbastecimento/:id', (req, res) => {
    const carroAbastecimentoId = req.params.id;
    carroAbastecimento.destroy({ where: { i_carroAbastecimento_id: carroAbastecimentoId } })
    .then(() => res.send("carroAbastecimento deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar carroAbastecimento: " + error.message));
  });
  
  export default carroAbastecimentoRouter;
  