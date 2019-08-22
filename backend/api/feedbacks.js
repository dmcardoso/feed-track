module.exports = (app) => {
    const moment = require('moment');
    moment.locale('pt-BR');

    const select = async (req, res) => {
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
            const feedbacks = await app.models.feedbacks.get(data);

            res.json(feedbacks);
        } catch (msg) {
            res.status(400).send('Bad request!');
        }
    };

    const save = async (req, res) => {
        const { feedback } = req.body;

        if (req.params.id) feedback.id = Number(req.params.id);

        try {
            if (feedback.id === undefined && feedback.descricao.trim() === '') {
                throw 'Descrição inválida!';
            }

            const result = await app.models.feedbacks.save(feedback);

            if (result === true) {
                res.sendStatus(204);
            } else {
                res.json(result);
            }
        } catch (msg) {
            console.log(msg);
            res.status(400).send("Bad Request");
        }
    };

    const softDelete = async (req, res) => {
        const { id } = req.params;

        const data = {
            id,
        };

        try {
            const result = await app.models.feedbacks.softDelete(data);

            if (result) {
                res.sendStatus(204);
            }
        } catch (msg) {
            res.sendStatus(400);
        }
    };

    return { select, save, softDelete };
};
