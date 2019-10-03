const express = require('express');

const FiliaisFuncionarios = require('../models/filiais-funcionarios');

const router = express.Router();

const save = async (req, res) => {
    const { filial_funcionario } = req.body;

    if (req.params.id) filial_funcionario.id = Number(req.params.id);

    try {
        const result = await FiliaisFuncionarios.save(filial_funcionario);

        if (result === true) {
            res.sendStatus(204);
        } else {
            res.json(result);
        }
    } catch (msg) {
        console.log(msg);
        res.sendStatus(400);
    }
};

router.put('/', save);
router.post('/', save);

router.delete('/', async (req, res) => {
    const { id } = req.query;

    const data = {
        id,
    };

    try {
        const result = await FiliaisFuncionarios.softDelete(data);

        if (result) {
            res.sendStatus(204);
        }
    } catch (msg) {
        res.sendStatus(400);
    }
});

// return { select, save, softDelete };
module.exports = app => app.use('/filiais-funcionarios', router);
