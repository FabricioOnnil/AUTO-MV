import express from 'express';
import usuarioVisita from '../models/usuarioVisitaData.js';

const usuarioVisitaRouter = express.Router();

// Rota para obter todos os postos de usuarioVisita
usuarioVisitaRouter.get('/usuarioVisita', (req, res) => {
    usuarioVisita.findAll()
      .then(usuarioVisita => {
        res.json(usuarioVisita);
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter usuarioVisita: " + error.message);
      });
  });
  
  // Rota para obter uma  usuarioVisita pelo ID
  usuarioVisitaRouter.get('/usuarioVisita/:id', (req, res) => {
    const agendamentoId = req.params.id;
    usuarioVisita.findOne({ where: { i_agendamento_agendado_id: agendamentoId }})
      .then(usuarioVisita => {
        if (!usuarioVisita) {
          res.status(404).send("usuarioVisita não encontrado");
          
        } else {
          res.json(usuarioVisita);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao obter  usuarioVisita: " + error.message);
      });
  });
  
  // Rota para cadastrar uma  nova usuarioVisita
  usuarioVisitaRouter.post('/usuarioVisita', (req, res) => {
    usuarioVisita.create(req.body)
    .then(() => res.send("usuarioVisita cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar usuarioVisita: " + error.message));
  });
  
  // Rota para atualizar  uma usuarioVisita pelo ID.
  usuarioVisitaRouter.put('/usuarioVisita/:id', (req, res) => {
    const agendamentoId = req.params.id;
    usuarioVisita.update(req.body, { where: { i_agendamento_agendado_id: agendamentoId } })
    .then(() => res.send("usuarioVisita atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar usuarioVisita: " + error.message));
  });
  
  // Rota para deletar uma  usuarioVisita
  usuarioVisitaRouter.delete('/usuarioVisita/:id', (req, res) => {
    const agendamentoId = req.params.id;
    usuarioVisita.destroy({ where: { i_agendamento_agendado_id: agendamentoId } })
    .then(() => res.send("usuarioVisita deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar usuarioVisita: " + error.message));
  });
  
  export default usuarioVisitaRouter;
  