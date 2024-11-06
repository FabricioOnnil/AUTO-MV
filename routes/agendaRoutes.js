import express from 'express';
import agenda from '../models/agendaData.js';


const agendaRouter = express.Router();

// Rota para obter todos os postos de agenda
agendaRouter.get('/agenda', async (req, res) => {
  try {
      const agendas = await agenda.findAll();
      res.json(agendas);
  } catch (error) {
      res.status(500).send("Erro ao obter agenda: " + error.message);
  }
});
  
  // Rota para obter uma  agenda pelo ID
  agendaRouter.get('/agenda/:id', async (req, res) => {
    const agendaId = req.params.id;

    try {
        const agendaItem = await agenda.findOne({ where: { i_agenda_idSchedule: agendaId } });
        if (!agendaItem) {
            return res.status(404).send("Agendamento não encontrado");
        }
        res.json(agendaItem);
    } catch (error) {
        res.status(500).send("Erro ao obter agenda: " + error.message);
    }
});
  
  // Rota para cadastrar uma  nova agenda
  agendaRouter.post('/agenda', async (req, res) => {
    try {
        await agenda.create(req.body);
        res.send("Agendamento cadastrado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao cadastrar agenda: " + error.message);
    }
});
  
  // Rota para atualizar  uma agenda pelo ID.
  agendaRouter.put('/agenda/:id', async (req, res) => {
    const agendaId = req.params.id;

    try {
        const result = await agenda.update(req.body, { where: { i_agenda_idSchedule: agendaId } });
        if (result[0] === 0) {
            return res.status(404).send("Agendamento não encontrado para atualizar");
        }
        res.send("Agendamento atualizado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao atualizar agenda: " + error.message);
    }
});
  
  // Rota para deletar uma  agenda
  agendaRouter.delete('/agenda/:id', async (req, res) => {
    const agendaId = req.params.id;

    try {
        const result = await agenda.destroy({ where: { i_agenda_idSchedule: agendaId } });
        if (result === 0) {
            return res.status(404).send("Agendamento não encontrado para deletar");
        }
        res.send("Agendamento deletado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao deletar agenda: " + error.message);
    }
});
  
  export default agendaRouter;
  