import express from 'express';
import agenda from '../models/agendaData.js';

const agendamentoRouter = express.Router();

// Rota para obter todos os agendamentos
agendamentoRouter.get('/agendamentos', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).send("Usuário não autenticado");
    }
    try {
          const agendamentos = await agenda.findAll();
          res.json(agendamentos);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});

// Rota para obter um agendamento pelo ID
agendamentoRouter.get('/agendamentos/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agenda.findOne({ where: { i_agenda_id: agendamentoId }})
    
      .then(agendamento => {
        if (!agendamento) {
          res.status(404).send("Agendamento não encontrado");
        } else {
          res.json(agendamento);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter agendamento: " + error.message);
      });
});

// Rota para cadastrar um novo agendamento
agendamentoRouter.post('/agendamentos', (req, res) => {
    agenda.create(req.body)
    .then(() => res.send("Agendamento cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar agendamento: " + error.message));
});

agendamentoRouter.post('/agenda/updateSchedule', async (req, res) => {

  const { i_agenda_idSchedule, i_agenda_usuarioReparo, i_agenda_agendamento } = req.body;
  try {
      await agenda.update(
        {
          i_agenda_usuarioReparo: i_agenda_usuarioReparo,
          i_agenda_agendamento : i_agenda_agendamento

        },
        {
          where: {
            i_agenda_idSchedule: i_agenda_idSchedule
          }
        }
      );

      res.status(200).json({ message: 'Dados atualizados com Sucesso' });

  } catch (error) {
    console.error("Erro au atualizar os dados:", error);
    res.status(500).json({ message: 'Erro ao atualizar os dados' });
  }
});


// Rota para atualizar um agendamento pelo ID
agendamentoRouter.put('/agendamentos/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agenda.update(req.body, { where: { i_agenda_id: agendamentoId } })
    .then(() => res.send("Agendamento atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar agendamento: " + error.message));
});

// Rota para deletar um agendamento
agendamentoRouter.delete('/agendamentos/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agenda.destroy({ where: { i_agenda_id: agendamentoId } })
    .then(() => res.send("Agendamento deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar agendamento: " + error.message));
});

export default agendamentoRouter;
