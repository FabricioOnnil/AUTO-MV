import express from 'express';
import diario from '../models/diarioData.js';

const diarioRouter = express.Router();

// Rota para obter todos os postos de diario
diarioRouter.get('/diario', (req, res) => {
    diario.findAll()
      .then(diario => {
        res.json(diario);
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter diario: " + error.message);
      });
  });
  
  // Rota para obter uma  diario pelo ID
  diarioRouter.get('/diario/:id', (req, res) => {
    const diarioId = req.params.id;
    diario.findOne({ where: { i_diario_id: diarioId }})
      .then(diario => {
        if (!diario) {
          res.status(404).send("diario não encontrado");
          
        } else {
          res.json(diario);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter  diario: " + error.message);
      });
  });
  
  // Rota para cadastrar uma  nova diario
  diarioRouter.post('/diario', (req, res) => {
    diario.create(req.body)
    .then(() => res.send("diario cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar diario: " + error.message));
  });
  
  // Rota para atualizar  uma diario pelo ID.
  diarioRouter.put('/diario/:id', (req, res) => {
    const diarioId = req.params.id;
    diario.update(req.body, { where: { i_diario_id: diarioId } })
    .then(() => res.send("diario atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar diario: " + error.message));
  });
  
  // Rota para deletar uma  diario
  diarioRouter.delete('/diario/:id', (req, res) => {
    const diarioId = req.params.id;
    diario.destroy({ where: { i_diario_id: diarioId } })
    .then(() => res.send("diario deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar diario: " + error.message));
  });
  
  export default diarioRouter;
  