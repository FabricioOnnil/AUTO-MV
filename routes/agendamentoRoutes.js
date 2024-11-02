import express from 'express';
import agenda from '../models/agendaData.js';
import entrega from '../models/entregaData.js';

const agendamentoRouter = express.Router();

// Rota para obter todos os agendamentos
agendamentoRouter.get('/agendamento', async (req, res) => {
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
agendamentoRouter.get('/agendamento/:id', (req, res) => {
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
agendamentoRouter.post('/agendamento', async (req, res) => {

  try {

    const novoAgendamento = await agenda.create(req.body);

    await entrega.create({
      s_entrega_nomeDelivery: novoAgendamento.s_agenda_nameSchedule,
      d_entrega_deliveryEndDate: novoAgendamento.d_agenda_deliverEndDate,
      d_entrega_deliveryEndTime: novoAgendamento.d_agenda_startTime,
      s_entrega_destinySelect: novoAgendamento.s_agenda_originSelect,
      i_entrega_kmFinal: novoAgendamento.i_agenda_kmInitial,
      i_entrega_deliveryCar: novoAgendamento.s_agenda_scheduleCar,
      d_entrega_createdAt: new Date(), // Adicione a data de criação
      i_entrega_agendamento: novoAgendamento.i_agenda_id // Aqui você pode usar a ID do agendamento recém-criado
  });

    res.send("Agendamento cadastrado com sucesso e dados copiados para entrega!");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar agendamento ou inserir na tabela entrega: " + error.message);
  }
});


agendamentoRouter.post('/agenda/updateSchedule', async (req, res) => {
  const { i_agenda_idSchedule, i_agenda_usuarioReparo, i_agenda_agendamento } = req.body;

  try {
      // Atualiza os dados na tabela agenda
      await agenda.update(
          {
              i_agenda_usuarioReparo: i_agenda_usuarioReparo,
              i_agenda_agendamento: i_agenda_agendamento
          },
          {
              where: {
                  i_agenda_idSchedule: i_agenda_idSchedule
              }
          }
      );

      // Encontra o agendamento atualizado
      const agendamento = await agenda.findByPk(i_agenda_idSchedule);

      if (!agendamento) {
          return res.status(404).json({ error: 'Agendamento não encontrado' });
      }

      // Copia os dados da tabela agenda para a tabela entrega
      const entrega = await entrega.create({
          nome: agendamento.s_agenda_nameSchedule,
          startDate: agendamento.d_agenda_startDate,
          startTime: agendamento.d_agenda_startTime,
          deliverEndDate: agendamento.d_agenda_deliverEndDate,
          originSelect: agendamento.s_agenda_originSelect,
          km_initial: agendamento.i_agenda_kmInitial,
          carSelect: agendamento.s_agenda_scheduleCar
      });

      // Retorna resposta de sucesso
      res.status(201).json({ message: 'Dados atualizados com sucesso e entregues.', entrega });

  } catch (error) {
      console.error("Erro ao atualizar os dados ou inserir na tabela entrega:", error);
      res.status(500).json({ message: 'Erro ao atualizar os dados ou inserir na tabela entrega' });
  }
});


// Rota para atualizar um agendamento pelo ID
agendamentoRouter.put('/agendamento/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agenda.update(req.body, { where: { i_agenda_id: agendamentoId } })
    .then(() => res.send("Agendamento atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar agendamento: " + error.message));
});

// Rota para deletar um agendamento
agendamentoRouter.delete('/agendamento/:id', (req, res) => {
    const agendamentoId = req.params.id;
    agenda.destroy({ where: { i_agenda_id: agendamentoId } })
    .then(() => res.send("Agendamento deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar agendamento: " + error.message));
});

export default agendamentoRouter;
