import express from 'express';
import InfoCarro from '../models/InfoCarro.mjs';

const router = express.Router();

router.get('/infoCarro', (req, res) => {
  infoCarro.findAll()
    .then((carros) => {
      res.json(carros);
    })
    .catch((error) => {
      console.error('Erro ao buscar carros:', error);
      res.status(500).json({ message: 'Erro ao buscar carros.' });
    });
});
  
router.get('/infoCarro/:id', (req, res) => {
  const { id } = req.params;
  
  infoCarro.findByPk(id)
    .then((carro) => {
      if (!carro) {
        return res.status(404).json({ message: 'Carro não encontrado.' });
      }
      res.json(carro);
    })
    .catch((error) => {
      console.error('Erro ao buscar carro por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar carro por ID.' });
    });
});

router.post('/infoCarro', (req, res) => {
  InfoCarro.create(req.body)
    .then(() => res.send("Carro cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar carro: " + error.message));
});

router.put('/infoCarro/:id', (req, res) => {
  const carroId = req.params.id;
  InfoCarro.update(req.body, { where: { id: carroId } })
    .then(() => res.send("Carro atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar carro: " + error.message));
});

router.delete('/infoCarro/:id', (req, res) => {
  const carroId = req.params.id;
  InfoCarro.destroy({ where: { id: carroId } })
    .then(() => res.send("Carro deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar carro: " + error.message));
});

export default router;


