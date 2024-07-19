import express from 'express';
import agenda from '../models/agendaData.js';

const agendaRouter = express.Router();

// Rota para obter todos os postos de agenda
agendaRouter.get('/agenda', (req, res) => {
    agenda.findAll()
      .then(agenda => {
        res.json(agenda);
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter agenda: " + error.message);
      });
  });
  
  // Rota para obter uma  agenda pelo ID
  agendaRouter.get('/agenda/:id', (req, res) => {
    const agendaId = req.params.id;
    agenda.findOne({ where: { i_agenda_idSchedule: agendaId }})
      .then(agenda => {
        if (!agenda) {
          res.status(404).send("agenda não encontrado");
          
        } else {
          res.json(agenda);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter  agenda: " + error.message);
      });
  });
  
  // Rota para cadastrar uma  nova agenda
  agendaRouter.post('/agenda', (req, res) => {
    agenda.create(req.body)
    .then(() => res.send("agenda cadastrada com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar agenda: " + error.message));
  });
  
  // Rota para atualizar  uma agenda pelo ID.
  agendaRouter.put('/agenda/:id', (req, res) => {
    const agendaId = req.params.id;
    agenda.update(req.body, { where: { i_agenda_idSchedule: agendaId } })
    .then(() => res.send("agenda atualizada com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar agenda: " + error.message));
  });
  
  // Rota para deletar uma  agenda
  agendaRouter.delete('/agenda/:id', (req, res) => {
    const agendaId = req.params.id;
    agenda.destroy({ where: { i_agenda_idSchedule: agendaId } })
    .then(() => res.send("agenda deletada com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar agenda: " + error.message));
  });
  
  export default agendaRouter;
  