module.exports = (app) => {
    const format = require('date-fns/format');

    const select = async (req, res) => {
        const id = req.query.id || req.params.id || 0;
        const limit = req.query.limit || null;
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const descricao = req.query.descricao || null;
        const criacao = req.query.criacao || null;
        const vendas = req.query.vendas || null;
        const cadastros = req.query.cadastros || null;
        const renovacoes = req.query.renovacoes || null;
        const reativacoes = req.query.reativacoes || null;
        // const funcionario = req.query.funcionario || null;
        // const filial = req.query.filial || null;

        const query = app.models.feedbacks.query().select('*').where('desativado', 0);

        if (id !== 0) {
            query.where('id', id);
        }

        const format_criacao = format(criacao, 'YYYY-MM-DD');

        if (search !== null) {
            // eslint-disable-next-line func-names
            const format_criacao_search = format(search, 'YYYY-MM-DD');
            query.andWhere(function () {
                this.orWhere('descricao', 'like', `%${search}%`);
                if (format_criacao_search !== 'Invalid Date') {
                    this.orWhere('criacao', 'like', `%${format_criacao_search}%`);
                }
                this.orWhere('vendas', '=', search);
                this.orWhere('cadastros', '=', search);
                this.orWhere('renovacoes', '=', search);
                this.orWhere('reativacoes', '=', search);
                // this.orWhere('funcionario', 'like', `%${search}%`);
                // this.orWhere('filial', 'like', `%${search}%`);
            });
        }

        if (descricao !== null) {
            query.where('descricao', 'like', `%${descricao}%`);
        }

        if (vendas !== null) {
            query.where('vendas', '=', vendas);
        }

        if (cadastros !== null) {
            query.where('cadastros', '=', cadastros);
        }

        if (renovacoes !== null) {
            query.where('renovacoes', '=', renovacoes);
        }

        if (reativacoes !== null) {
            query.where('reativacoes', '=', reativacoes);
        }

        if (reativacoes !== null) {
            query.where('reativacoes', '=', reativacoes);
        }

        if (criacao !== null && format_criacao !== 'Invalid Date') {
            query.where('criacao', 'like', `%${format_criacao}%`);
        }

        if (limit !== null) {
            query.limit(limit);
        }

        if (page !== 1 && limit !== null) {
            query.offset(page * limit - limit);
        }

        const feedbacks = await query.then().catch((e) => {
            console.log(e);
            res.status(400).send('Bad request!');
        });

        res.json(feedbacks);
    };

    const save = (req, res) => {
        const { feedback } = req.body;

        if (req.params.id) feedback.id = Number(req.params.id);

        try {
            if (feedback.descricao.trim() === '') {
                throw Error('Descrição inválida!');
            }
        } catch (msg) {
            res.status(400).send(msg);
        }

        app.models.feedbacks.query().upsert(feedback).then((result) => {
            if (result) {
                res.json(result);
            } else {
                res.sendStatus(204);
            }
        }).catch((e) => {
            // console.log(e);
            res.status(400).send('Bad request!');
        });
    };

    const softDelete = async (req, res) => {
        const { id } = req.params;

        const feedback = await app.models.feedbacks.query().select('*').where('id', id).first();

        if (feedback && feedback.id) {
            feedback.desativado = 1;
            app.models.feedbacks.query().soft(feedback).then(() => {
                res.sendStatus(204);
            }).catch(() => {
                res.status(400).send('Bad request!');
            });
        } else {
            res.json({ message: 'Não foi possível excluir feedback!' });
        }
    };

    return { select, save, softDelete };
};
