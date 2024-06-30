import express from 'express';
import FuelStation from '../models/FuelStation.mjs';

const router = express.Router();

// Rota para obter todos os postos de combustível
router.get('/fuelStations', (req, res) => {
  FuelStation.findAll()
    .then(fuelStations => {
      res.json(fuelStations);
    })
    .catch((error) => {
      res.status(500).send("Erro ao obter postos de combustível: " + error.message);
    });
});

// Rota para obter um posto de combustível específico
router.get('/fuelStation/:id', (req, res) => {
  const fuelStationId = req.params.id;
  FuelStation.findByPk(fuelStationId)
    .then(fuelStation => {
      if (fuelStation) {
        res.json(fuelStation);
      } else {
        res.status(404).send("Posto de combustível não encontrado");
      }
    })
    .catch((error) => {
      res.status(500).send("Erro ao obter posto de combustível: " + error.message);
    });
});

// Rota para cadastrar um posto de combustível
router.post('/fuelStation', (req, res) => {
  FuelStation.create(req.body)
    .then(() => {
      res.send("Posto de combustível cadastrado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao cadastrar posto de combustível: " + error.message);
    });
});

// Rota para atualizar informações de um posto de combustível
router.put('/fuelStation/:id', (req, res) => {
  const fuelStationId = req.params.id;
  FuelStation.update(req.body, { where: { idFuel: fuelStationId } })
    .then(() => {
      res.send("Posto de combustível atualizado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao atualizar posto de combustível: " + error.message);
    });
});

// Rota para deletar um posto de combustível
router.delete('/fuelStation/:id', (req, res) => {
  const fuelStationId = req.params.id;
  FuelStation.destroy({ where: { idFuel: fuelStationId } })
    .then(() => {
      res.send("Posto de combustível deletado com sucesso!");
    })
    .catch((error) => {
      res.status(500).send("Erro ao deletar posto de combustível: " + error.message);
    });
});

export default router;
