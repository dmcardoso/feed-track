const express = require('express');
const moment = require('moment');
const bcrypt = require('bcrypt');
const { images_url } = require('../../config/paths');
const Funcionarios = require('../models/funcionarios');

const router = express.Router();

moment.locale('pt-BR');

router.get('/', async (req, res) => {
    const id = req.query.id || req.params.id || 0;
    const limit = req.query.limit || null;
    const search = req.query.search || null;
    const page = req.query.page || 1;
    const nome = req.query.nome || null;
    const email = req.query.email || null;
    const nascimento = req.query.nascimento || null;

    const data = {
        id,
        limit,
        search,
        page,
        nome,
        email,
        nascimento,
    };

    try {
        const result = await Funcionarios.get(data);

        res.json(result);
    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad request!');
    }
});

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const save = async (req, res) => {
    try {
        const { upload } = require('../util/fileupload');

        upload(req, res, async (files, fields) => {
            const { senha_confirmacao, ...funcionario } = { ...fields };

            if (funcionario.id) funcionario.id = Number(funcionario.id);

            if (funcionario.id === undefined && funcionario.nome.trim() === '') {
                throw 'Nome inválido!';
            }

            if (funcionario.senha !== senha_confirmacao) {
                throw 'Senhas devem ser iguais!';
            }

            if (funcionario.senha) funcionario.senha = encryptPassword(funcionario.senha);

            const result = await Funcionarios.save(funcionario);

            if (result === true) {
                res.sendStatus(204);
            } else {
                res.json(result);
            }
        });
    } catch (e) {
        res.sendStatus(400);
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
        const result = await Funcionarios.softDelete(data);

        if (result) {
            res.sendStatus(204);
        }
    } catch (msg) {
        res.sendStatus(400);
    }
});

module.exports = app => app.use('/funcionarios', router);
