module.exports = (app) => {
    const moment = require('moment');
    moment.locale('pt-BR');

    const select = async (req, res) => {
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
            const result = await app.models.filiais.get(data);

            res.json(result);
        } catch (msg) {
            console.log(msg);
            res.status(400).send('Bad request');
        }
    };

    const save = async (req, res) => {
        const { filial } = req.body;

        if (req.params.id) filial.id = Number(req.params.id);

        try {
            if (req.params.id === undefined && filial.filial.trim() === '') {
                throw 'Filial inválida!';
            }

            const result = await app.models.filiais.save(filial);

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
            const result = app.models.filiais.softDelete(data);

            if (result) {
                res.sendStatus(204);
            }
        } catch (msg) {
            res.status(400).send(msg);
        }
    };

    return { select, save, softDelete };
};
