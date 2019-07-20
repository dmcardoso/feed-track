module.exports = (app) => {
    const moment = require('moment');
    moment.locale('pt-BR');

    const select = async (req, res) => {
        const id = req.query.id || req.params.id || 0;
        const search = req.query.search || null;
        const filial = req.query.filial || null;
        const fundacao = req.query.fundacao || null;

        const limit = req.query.limit || null;
        const page = req.query.page || 1;

        const query = app.models.filiais.query().select('*').where('desativado', 0);

        if (id !== 0) {
            query.where('id', id);
        }

        const format_fundacao = moment(fundacao, 'DD/MM/YYYY');
        const format_fundacao_search = format_fundacao.format('YYYY-MM-DD');

        if (search !== null) {
            // eslint-disable-next-line func-names
            query.where(function () {
                this.orWhere('filial', 'like', `%${search}%`);

                const format_date = moment(search, 'DD/MM/YYYY');
                const format_date_search = format_date.format('YYYY-MM-DD');
                if (format_date.isValid()) {
                    this.orWhere('fundacao', 'like', `%${format_date_search}%`);
                }
            });
        }

        if (filial !== null) {
            query.where('filial', 'like', `%${filial}%`);
        }

        if (fundacao !== null && format_fundacao.isValid()) {
            query.where('fundacao', 'like', `%${format_fundacao_search}%`);
        }

        if (limit !== null) {
            query.limit(limit);
        }

        if (page !== 1 && limit !== null) {
            query.offset(page * limit - limit);
        }

        const filiais = await query.then().catch(() => {
            res.status(400).send('Bad request!');
        });

        res.json(filiais);
    };

    const save = async (req, res) => {
        let { filial } = req.body;

        if (req.params.id) filial.id = Number(req.params.id);

        try {
            if (req.params.id === undefined && filial.filial.trim() === '') {
                throw 'Filial inválida!';
            }
        } catch (msg) {
            res.status(400).send(msg);
        }

        if (filial.id) {
            const filial_database = await app.models.filiais.query().select('*').where('id', filial.id).first();
            if (filial_database && filial_database.id) {
                filial = Object.assign(filial_database, filial);
            } else {
                res.json({ message: 'Não foi possível atualizar filial!' });
            }
        }

        app.models.filiais.query().upsert(filial).then((result) => {
            if (result) {
                res.json(result);
            } else {
                res.sendStatus(204);
            }
        }).catch((e) => {
            res.status(400).send('Bad request!');
        });
    };

    const softDelete = async (req, res) => {
        const { id } = req.params;

        const filial = await app.models.filiais.query().select('*').where('id', id).first();

        if (filial && filial.id) {
            filial.desativado = 1;
            app.models.filiais.query().soft(filial).then(() => {
                res.sendStatus(204);
            }).catch(() => {
                res.status(400).send('Bad request!');
            });
        } else {
            res.json({ message: 'Não foi possível excluir filial!' });
        }
    };

    return { select, save, softDelete };
};
