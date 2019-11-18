const express = require('express');
const moment = require('moment');

const Filiais = require('../models/filiais');
const FiliaisFuncionarios = require('../models/filiais-funcionarios');

const router = express.Router();

moment.locale('pt-BR');

router.get('/', async (req, res) => {
    const id = req.query.id || req.params.id || 0;
    const search = req.query.search || null;
    const filial = req.query.filial || null;
    const fundacao = req.query.fundacao || null;

    const limit = Number(req.query.limit) || null;
    const page = Number(req.query.page) || 1;

    const data = {
        id,
        search,
        filial,
        fundacao,
        limit,
        page,
    };

    try {
        const result = await Filiais.get(data);

        res.json(result);
    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad request');
    }
});

router.get('/funcionarios', async (req, res) => {
    const cargo = req.query.cargo || null;
    const funcionario = req.query.funcionario || null;
    const filial = req.query.filial || null;
    const limit = Number(req.query.limit) || null;
    const page = Number(req.query.page);

    const data = {
        limit,
        page,
        cargo,
        funcionario,
        filial,
    };

    try {
        const result = await FiliaisFuncionarios.get(data);

        res.json(result);
    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad request');
    }
});

const save = async (req, res) => {
    const { filial } = req.body;

    if (req.params.id) filial.id = Number(req.params.id);

    try {
        if (req.params.id === undefined && filial.filial.trim() === '') {
            throw 'Filial inválida!';
        }

        const result = await Filiais.save(filial);

        if (result === true) {
            res.sendStatus(204);
        } else {
            res.json(result);
        }
    } catch (msg) {
        console.log(msg);
        res.status(400).send(msg);
    }
};

router.put('/', save);
router.post('/', save);

router.delete('/', async (req, res) => {
    const id = req.query.id || req.params.id || 0;

    const data = {
        id,
    };

    try {
        const result = await Filiais.softDelete(data);

        if (result) {
            res.sendStatus(204);
        }
    } catch (msg) {
        console.log(msg);
        res.sendStatus(400);
    }
});

module.exports = app => app.use('/filiais', router);
