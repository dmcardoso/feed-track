const express = require('express');
const moment = require('moment');

const Feedbacks = require('../models/feedbacks');

const router = express.Router();

moment.locale('pt-BR');

router.get('/', async (req, res) => {
    const id = req.query.id || req.params.id || 0;
    const limit = req.query.limit || null;
    const search = req.query.search || null;
    const page = req.query.page || 1;

    const descricao = req.query.descricao || null;
    const data_referencia = req.query.data_referencia || null;
    const vendas = req.query.vendas || null;
    const cadastros = req.query.cadastros || null;
    const renovacoes = req.query.renovacoes || null;
    const reativacoes = req.query.reativacoes || null;
    const funcionario = req.query.funcionario || null;
    const filial = req.query.filial || null;

    const data = {
        id,
        limit,
        search,
        page,
        descricao,
        data_referencia,
        vendas,
        cadastros,
        renovacoes,
        reativacoes,
        funcionario,
        filial,
    };

    try {
        const feedbacks = await Feedbacks.get(data);

        res.json(feedbacks);
    } catch (msg) {
        res.status(400).send('Bad request!');
    }
});

router.get('/estatisticas/total', async (req, res) => {
    const id = req.query.id || req.params.id || 0;
    const limit = req.query.limit || null;
    const search = req.query.search || null;

    const data_referencia = req.query.data_referencia || null;
    const filial = req.query.filial || null;

    const data = {
        id,
        limit,
        search,
        data_referencia,
        filial,
    };
    try {
        const statistics = await Feedbacks.estatisticasTotal(data);

        res.json(statistics);
    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad request!');
    }
});

const save = async (req, res) => {
    const { feedback } = req.body;

    if (req.params.id) feedback.id = Number(req.params.id);

    try {
        if (feedback.id === undefined && feedback.descricao.trim() === '') {
            throw 'Descrição inválida!';
        }

        const result = await Feedbacks.save(feedback);

        if (result === true) {
            res.sendStatus(204);
        } else {
            res.json(result);
        }
    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad Request');
    }
};

router.put('/', save);
router.post('/', save);

router.delete('/', async (req, res) => {
    const { id } = req.params;

    const data = {
        id,
    };

    try {
        const result = await Feedbacks.softDelete(data);

        if (result) {
            res.sendStatus(204);
        }
    } catch (msg) {
        res.sendStatus(400);
    }
});

module.exports = app => app.use('/feedbacks', router);
