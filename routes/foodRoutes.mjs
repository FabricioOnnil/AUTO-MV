import express from 'express';
import Food from '../models/Food.mjs';

const router = express.Router();

router.get('/food', (req, res) => {
    Food.findAll()
      .then((food) => {
        res.json(food);
      })
      .catch((error) => {
        console.error('Erro ao buscar refeição:', error);
        res.status(500).json({ message: 'Erro ao buscar refeição.' });
      });
  });
  
  // Rota para buscar um food por ID
  router.get('/food/:id', (req, res) => {
    const foodId = req.params.id;
    Food.findByPk(foodId)
      .then((food) => {
        if (food) {
          res.json(food);
        } else {
          res.status(404).json({ message: 'Refeição não encontrada.' });
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar refeição por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar refeição por ID.' });
      });
  });

  
router.post('/food', (req, res) => {
  Food.create(req.body)
    .then(() => res.send("Refeição cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar refeição: " + error.message));
});

router.put('/food/:id', (req, res) => {
  const foodId = req.params.id;
  Food.update(req.body, { where: { idFood: foodId } })
    .then(() => res.send("Refeição atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar refeição: " + error.message));
});

router.delete('/food/:id', (req, res) => {
  const foodId = req.params.id;
  Food.destroy({ where: { idFood: foodId } })
    .then(() => res.send("Refeição deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar refeição: " + error.message));
});

export default router;

