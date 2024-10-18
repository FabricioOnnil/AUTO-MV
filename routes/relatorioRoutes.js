import express from 'express';
import comida from '../models/comidaData.js'; // ajustando o caminho
import reparo from '../models/reparoData.js'; // ajustando o caminho
import abastecimento from '../models/abastecimentoData.js'; // ajustando o caminho

const relatorioRouter = express.Router();

// Rota para buscar dados da tabela comida
relatorioRouter.get('/comida', async (req, res) => {
    try {
        const refeicoes = await comida.findAll();
        res.json(refeicoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados de refeições' });
    }
});

// Rota para buscar dados da tabela reparo
relatorioRouter.get('/reparo', async (req, res) => {
    try {
        const reparos = await reparo.findAll();
        res.json(reparos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados de reparos' });
    }
});

// Rota para buscar dados da tabela abastecimento
relatorioRouter.get('/abastecimento', async (req, res) => {
    try {
        const abastecimentos = await abastecimento.findAll();
        res.json(abastecimentos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados de abastecimentos' });
    }
});

export default relatorioRouter;
