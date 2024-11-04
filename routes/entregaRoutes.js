import express from 'express';
import entrega from '../models/entregaData.js';
import agenda from '../models/agendaData.js';

const entregaRouter = express.Router();

// Rota para obter todos os postos de entrega
entregaRouter.get('/', async (req, res) => {
  try {
    
    const entregas = await entrega.findAll()
      
        res.json(entregas);
      } catch (error) {
        res.status(500).send("Erro ao obter entrega: " + error.message);
      }
    });

  
  // Rota para obter uma  entrega pelo ID
  entregaRouter.get('/entrega/:id', async (req, res) => {

    const entregaId = req.params.id;
    try {
      
    const entregas = await entrega.findOne({ where: { i_entrega_idDelivery: entregaId }});
      
       if (!entrega) {
          res.status(404).send("entrega não encontrado");
          
        } else {
          res.json(entrega);
        }
      } catch(error) {
        res.status(500).send("Erro ao obter  entrega: " + error.message);
      }
  });


entregaRouter.post('/', async (req, res) => {
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


  // Rota para atualizar  uma entrega pelo ID.
  entregaRouter.put('/entrega/:id', (req, res) => {
    const entregaId = req.params.id;
    entrega.update(req.body, { where: { i_entrega_idDelivery: entregaId } })
    .then(() => res.send("entrega atualizada com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar entrega: " + error.message));
  });
  
  // Rota para deletar uma  entrega
  entregaRouter.delete('/entrega/:id', (req, res) => {
    const entregaId = req.params.id;
    entrega.destroy({ where: { i_entrega_idDelivery: entregaId } })
    .then(() => res.send("entrega deletada com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar entrega: " + error.message));
  });
  
  export default entregaRouter;
  