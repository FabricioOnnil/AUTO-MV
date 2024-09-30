import express from 'express';
import carro from '../models/carroData.js';

const carRouter = express.Router();

//Rota para buscar todos os carros.
carRouter.get('/carro', async (req, res) => {

  try {
        const carros = await carro.findAll();
        res.json(carros);
    } catch (error) {
      console.error('Erro ao buscar carro:', error.message);
      return res.status(500).send('Erro ao buscar carro.' + error.message);
    }
  });

//Rota para buscar um carro pelo ID.
carRouter.get('/carro/:id', async (req, res) => {
  const idCar = req.params.id;
  try {
    const carroEncontrado = await carro.findOne({ where: { i_carro_idcar: idCar } });
    if(!carroEncontrado) {
        return res.status(404).send('Carro não encontrado.');
    }
        return res.json(carroEncontrado);
  } catch (error) {
      console.error('Erro ao buscar carro:', error.message);
      return res.status(500).send("Erro ao vuscar carro: " + error.message);        
      }
    });

  // Rota para cadastrar um novo carro.
carRouter.post('/carro', async (req, res) => {
  try {
        const novoCarro = await carro.create(req.body);
        return res.status(201).send(`Carro cadastrado com sucesso! ID: ${novoCarro.i_carro_idcar}`);
  } catch (error) {
      console.error('Erro ao cadastrar carro:', error.message);
      return res.status(500).send("Erro ao cadastrar carro: " + error.message);
  }
});

//Rota para atualizar um carro pelo ID.
carRouter.put('/carro/:id', async (req, res) => {
  const idCar = req.params.id;

  req.body.d_carro_updateAt = new Date();

  try {
        const [atualizado] = await carro.update(req.body, { where: { i_carro_idcar: idCar } });
        if (atualizado) {
            return res.send("Carro atualizado com sucesso!");
        } 
        return res.status(404).send('Carro não encontrado.');
  } catch (error) {
        console.error('Erro ao atualizar carro:', error.message);
        return res.status(500).send("Erro ao atualizar carro: " + error.message );
  }
});

//Rota para deletar um carro pelo ID.
carRouter.delete('/carro/:id', async (req, res) => {
  const idCar = req.params.id;
  try {
        const deletado = await carro.destroy({ where: { i_carro_idcar: idCar } });
        if (deletado) {
          return res.send("Carro deletado com sucesso!");
        }
        return res.status(404).send('Carro não encontrado.');
  } catch (error) {
      console.error('Erro ao deletar carro:', error.message);
      return res.status(500).send("Erro ao deletar carro: " + error.message);
  }
});

export default carRouter;
