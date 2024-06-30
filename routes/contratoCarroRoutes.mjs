import express from 'express';
import ContratoCarro from '../models/ContratoCarro.mjs';

const router = express.Router();

router.get('/contratoCarro', (req, res) => {
  ContratoCarro.findAll()
    .then((contratos) => {
      res.json(contratos);
    })
    .catch((error) => {
      console.error('Erro ao buscar contratos:', error);
      res.status(500).json({ message: 'Erro ao buscar contratos.' });
    });
});

router.get('/contratoCarro/:id', (req, res) => {
  const { id } = req.params;
  
  ContratoCarro.findByPk(id)
    .then((contrato) => {
      if (!contrato) {
        return res.status(404).json({ message: 'Contrato não encontrado.' });
      }
      res.json(contrato);
    })
    .catch((error) => {
      console.error('Erro ao buscar contrato por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar contrato.' });
    });
});

router.post('/contratoCarro', (req, res) => {
  ContratoCarro.create(req.body)
    .then(() => res.send("Contrato de carro cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar contrato de carro: " + error.message));
});

router.put('/contratoCarro/:id', (req, res) => {
  const contratoId = req.params.id;
  ContratoCarro.update(req.body, { where: { id: contratoId } })
    .then(() => res.send("Contrato atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar contrato: " + error.message));
});

router.delete('/contratoCarro/:id', (req, res) => {
  const contratoId = req.params.id;
  ContratoCarro.destroy({ where: { id: contratoId } })
    .then(() => res.send("Contrato deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar contrato: " + error.message));
});

export default router;
