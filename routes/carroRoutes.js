import express from 'express';
import carro from '../models/carroData.js';

const carRouter = express.Router();

//Rota para buscar todos os carros.
carRouter.get('/carro', (req, res) => {
  carro.findAll()
    .then((carro) => {
      res.json(carro);
    })
    .catch((error) => {
      console.error('Erro ao buscar carro:', error);
      res.status(500).send('Erro ao buscar carro.');
    });
});

//Rota paara buscar um carro pelo ID.
carRouter.get('/carro/:id', (req, res) => {
  const idCar = req.params.id;
  usuario.findOne({ where: { i_carro_idcar: idCar } })
    .then((carro) => {
      if (!carro) {
          res.status(404).send('Carro não encontrado.');
      }else{
        res.json(carro);
      }      
    })
      .catch((error) => {
        res.status(500).send("Erro ao buscar carro: " + error.message);
      });
    });

  // Rota para cadastrar um novo carro.
carRouter.post('/carro', (req, res) => {
  carro.create(req.body)
    .then(() => res.send("Carro cadastrado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar carro: " + error.message));
});

//Rota para atualizar um carro pelo ID.
carRouter.put('/carro/:id', (req, res) => {
  const idCar = req.params.id;
  carro.update(req.body, { where: { i_carro_idcar: idCar } })
    .then(() => res.send("Carro atualizado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar carro: " + error.message));
});

//Rota para deletar um carro pelo ID.
carRouter.delete('/carro/:id', (req, res) => {
  const idCar = req.params.id;
  carro.destroy({ where: { i_carro_idcar: idCar } })
    .then(() => res.send("Carro deletado com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar carro: " + error.message));
});

export default carRouter;
