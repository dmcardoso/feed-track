module.exports = (app) => {
    const select = async (req, res) => {
        const id = req.query.id || req.params.id || 0;
        const limit = req.query.limit || null;
        const search = req.query.search || null;
        const page = req.query.page || 1;

        const query = app.models.cargos.query().select('*').where('desativado', 0);

        if (id !== 0) {
            query.where('id', id);
        }

        if (search !== null) {
            query.where('descricao', 'like', `%${search}%`);
        }

        if (limit !== null) {
            query.limit(limit);
        }

        if (page !== 1 && limit !== null) {
            query.offset(page * limit - limit);
        }

        const cargos = await query.then().catch(() => {
            res.status(400).send('Bad request!');
        });

        res.json(cargos);
    };

    const save = (req, res) => {
        const { cargo } = req.body;

        if (req.params.id) cargo.id = Number(req.params.id);

        try {
            if (cargo.descricao.trim() === '') {
                throw Error('Descrição inválida!');
            }
        } catch (msg) {
            res.status(400).send(msg);
        }

        app.models.cargos.query().upsert(cargo).then((result) => {
            if (result) {
                res.json(result);
            } else {
                res.sendStatus(204);
            }
        }).catch(() => {
            res.status(400).send('Bad request!');
        });
    };

    const softDelete = async (req, res) => {
        const { id } = req.params;

        const cargo = await app.models.cargos.query().select('*').where('id', id).first();

        if (cargo && cargo.id) {
            cargo.desativado = 1;
            app.models.cargos.query().soft(cargo).then(() => {
                res.sendStatus(204);
            }).catch(() => {
                res.status(400).send('Bad request!');
            });
        } else {
            res.json({ message: 'Não foi possível excluir cargo!' });
        }
    };

    return { select, save, softDelete };
};
