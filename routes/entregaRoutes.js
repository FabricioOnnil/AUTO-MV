import express from 'express';
import entrega from '../models/entregaData.js';

const entregaRouter = express.Router();

// Rota para obter todos os postos de entrega
entregaRouter.get('/entrega', (req, res) => {
    entrega.findAll()
      .then(entrega => {
        res.json(entrega);
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter entrega: " + error.message);
      });
  });
  
  // Rota para obter uma  entrega pelo ID
  entregaRouter.get('/entrega/:id', (req, res) => {
    const entregaId = req.params.id;
    entrega.findOne({ where: { i_entrega_idDelivery: entregaId }})
      .then(entrega => {
        if (!entrega) {
          res.status(404).send("entrega não encontrado");
          
        } else {
          res.json(entrega);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter  entrega: " + error.message);
      });
  });
  

  // Rota para cadastrar uma  nova entrega
  entregaRouter.post('/entrega', async (req, res) => {
    try {
        const { 
            s_entrega_nomeDelivery, 
            d_entrega_deliveryEndDate, 
            d_entrega_deliveryEndTime, 
            s_entrega_destinySelect, 
            i_entrega_kmFinal, 
            i_entrega_deliveryCar, 
            d_entrega_createdAt, 
            i_entrega_agendamento 
        } = req.body;

        
        await entrega.create({
            s_entrega_nomeDelivery,
            d_entrega_deliveryEndDate,
            d_entrega_deliveryEndTime,
            s_entrega_destinySelect,
            i_entrega_kmFinal,
            i_entrega_deliveryCar,
            d_entrega_createdAt,
            i_entrega_agendamento
        });

        res.status(201).json({ message: 'Entrega registrada com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar entrega:', error);
        res.status(500).json({ error: 'Erro ao registrar entrega.' });
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
  