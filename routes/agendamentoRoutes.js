import express from 'express';
import agendamento from '../models/agendamentoData.js';

const agendamentoRouter = express.Router();

// Rota para obter todos os postos de agendamento
agendamentoRouter.get('/agendamento', (req, res) => {
    agendamento.findAll()
      .then(agendamento => {
        res.json(agendamento);
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter agendamento: " + error.message);
      });
  });
  
  // Rota para obter uma  agendamento pelo ID
  agendamentoRouter.get('/agendamento/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agendamento.findOne({ where: { i_agendamento_agendado_id: agendamentoId }})
      .then(agendamento => {
        if (!agendamento) {
          res.status(404).send("agendamento não encontrado");
          
        } else {
          res.json(agendamento);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter  agendamento: " + error.message);
      });
  });
  
  // Rota para cadastrar uma  nova agendamento
  agendamentoRouter.post('/agendamento', (req, res) => {
    agendamento.create(req.body)
    .then(() => res.send("agendamento cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar agendamento: " + error.message));
  });
  
  // Rota para atualizar  uma agendamento pelo ID.
  agendamentoRouter.put('/agendamento/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agendamento.update(req.body, { where: { i_agendamento_agendado_id: agendamentoId } })
    .then(() => res.send("agendamento atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar agendamento: " + error.message));
  });
  
  // Rota para deletar uma  agendamento
  agendamentoRouter.delete('/agendamento/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agendamento.destroy({ where: { i_agendamento_agendado_id: agendamentoId } })
    .then(() => res.send("agendamento deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar agendamento: " + error.message));
  });
  
  export default agendamentoRouter;
  