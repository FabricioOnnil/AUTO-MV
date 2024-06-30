import express from 'express';
import CustosFixos from '../models/CustoFixo.mjs';

const router = express.Router();

router.get('/custosFixos', (req, res) => {
  CustoFixo.findAll()
    .then((custosFixos) => {
      res.json(custosFixos);
    })
    .catch((error) => {
      console.error('Erro ao buscar custos fixos:', error);
      res.status(500).json({ message: 'Erro ao buscar custos fixos.' });
    });
});

// Rota para buscar um custo fixo por ID
router.get('/custosFixos/:id', (req, res) => {
  const { id } = req.params;
  
  CustoFixo.findByPk(id)
    .then((custoFixo) => {
      if (!custoFixo) {
        return res.status(404).json({ message: 'Custo fixo não encontrado.' });
      }
      res.json(custoFixo);
    })
    .catch((error) => {
      console.error('Erro ao buscar custo fixo por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar custo fixo.' });
    });
});

router.post('/custosFixos', (req, res) => {
  CustosFixos.create(req.body)
    .then(() => res.send("Custos fixos cadastrados com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao cadastrar custos fixos: " + error.message));
});

router.put('/custosFixos/:id', (req, res) => {
  const custoId = req.params.id;
  CustosFixos.update(req.body, { where: { id: custoId } })
    .then(() => res.send("Custos fixos atualizados com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao atualizar custos fixos: " + error.message));
});

router.delete('/custosFixos/:id', (req, res) => {
  const custoId = req.params.id;
  CustosFixos.destroy({ where: { id: custoId } })
    .then(() => res.send("Custos fixos deletados com sucesso!"))
    .catch((error) => res.status(500).send("Erro ao deletar custos fixos: " + error.message));
});

export default router;
