import express from 'express';
import agendamento from '../models/agendamentoData.js';
import agenda from '../models/agendaData.js';

const agendamentoRouter = express.Router();

// Rota para obter todos os postos de agendamento
agendamentoRouter.get('/agendamentos', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).send("Usuário não autenticado");
    }
    try {
          const agendamento = await agenda.findAll();
          res.json(agendamento);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos'});
    }
  });
  
  // Rota para obter uma  agendamento pelo ID
  agendamentoRouter.get('/agendamentos/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agendamento.findOne({ where: { i_agendamento_agendado_id: agendamentoId }})
    
      .then(agendamento => {
        if (!agendamento) {
          res.status(404).send("agendamentos não encontrado");
          
        } else {
          res.json(agendamento);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter  agendamentos: " + error.message);
      });

  });
  
  // Rota para cadastrar uma  nova agendamento
  agendamentoRouter.post('/agendamentos', (req, res) => {
    agendamento.create(req.body)
    .then(() => res.send("agendamentos cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar agendamentos: " + error.message));
  });
  
  // Rota para atualizar  uma agendamento pelo ID.
  agendamentoRouter.put('/agendamentos/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agendamento.update(req.body, { where: { i_agendamento_agendado_id: agendamentoId } })
    .then(() => res.send("agendamentos atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar agendamentos: " + error.message));
  });
  
  // Rota para deletar uma  agendamento
  agendamentoRouter.delete('/agendamentos/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agendamento.destroy({ where: { i_agendamento_agendado_id: agendamentoId } })
    .then(() => res.send("agendamentos deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar agendamentos: " + error.message));
  });
  
  export default agendamentoRouter;
  