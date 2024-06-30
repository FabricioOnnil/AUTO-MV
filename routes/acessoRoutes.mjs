import express from 'express';
import Acesso from '../models/Acesso.mjs';

const router = express.Router();

// Rota para buscar todos os acessos
router.get('/acessos', (req, res) => {
  Acesso.findAll()
    .then((acessos) => {
      res.json(acessos);
    })
    .catch((error) => {
      res.status(500).send("Erro ao buscar acessos: " + error.message);
    });
});
  // Rota para buscar um acesso pelo ID
  router.get('/acessos/:id', (req, res) => {
    const acessoId = req.params.id;
    Acesso.findByPk(acessoId)
      .then((acesso) => {
        if (!acesso) {
          res.status(404).send("Acesso não encontrado");
        } else {
          res.json(acesso);
        }
      })
      .catch((error) => {
        res.status(500).send("Erro ao buscar acesso: " + error.message);
      });
  });

router.post('/acesso', (req, res) => {
  Acesso.create(req.body)
    .then(() => res.send("Acesso cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar acesso: " + error.message));
});

router.put('/acesso/:id', (req, res) => {
  const acessoId = req.params.id;
  Acesso.update(req.body, { where: { id: acessoId } })
    .then(() => res.send("Acesso atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar acesso: " + error.message));
});

router.delete('/acesso/:id', (req, res) => {
  const acessoId = req.params.id;
  Acesso.destroy({ where: { id: acessoId } })
    .then(() => res.send("Acesso deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar acesso: " + error.message));
});





export default router;
