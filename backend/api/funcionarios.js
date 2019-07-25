const moment = require('moment');
const bcript = require('bcrypt-nodejs');

moment.locale('pt-BR');

module.exports = (app) => {
    const encryptPassword = (password) => {
        const salt = bcript.genSaltSync(10);
        return bcript.hashSync(password, salt);
    };


    const select = async (req, res) => {
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
            const result = await app.models.funcionarios.get(data);

            res.json(result);
        } catch (msg) {
            res.status(400).send('Bad request!');
        }
    };

    const save = async (req, res) => {
        const { funcionario } = req.body;

        if (req.params.id) funcionario.id = Number(req.params.id);

        if (funcionario.senha) funcionario.senha = encryptPassword(funcionario.senha);

        try {
            if (funcionario.id === undefined && funcionario.nome.trim() === '') {
                throw 'Descrição inválida!';
            }

            const result = await app.models.funcionarios.save(funcionario);

            if (result === true) {
                res.sendStatus(204);
            } else {
                res.json(result);
            }
        } catch (msg) {
            res.status(400).send(msg);
        }
    };

    const softDelete = async (req, res) => {
        const { id } = req.params;

        const data = {
            id,
        };

        try {
            const result = app.models.funcionarios.softDelete(data);

            if (result) {
                res.sendStatus(204);
            }
        } catch (msg) {
            res.status(400).send(msg);
        }
    };

    return { select, save, softDelete };
};
