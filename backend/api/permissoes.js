module.exports = (app) => {
    // eslint-disable-next-line no-underscore-dangle
    const _select = async ({
        id, limit, search, page,
    }) => {
        const query = app.models.permissoes.query().select('*').where('desativado', 0);

        if (id !== 0) {
            query.where('id', id);
        }

        if (search !== null) {
            query.where('permissao', 'like', `%${search}%`);
        }

        if (limit !== null) {
            query.limit(limit);
        }

        if (page !== 1 && limit !== null) {
            query.offset(page * limit - limit);
        }

        return query.then().catch(() => 'Bad request!');
    };

    const select = async (req, res) => {
        const id = req.query.id || req.params.id || 0;
        const limit = req.query.limit || null;
        const search = req.query.search || null;
        const page = req.query.page || 1;

        const data = {
            id,
            limit,
            search,
            page,
        };

        try {
            const result = await _select(data);

            res.json(result);
        } catch (msg) {
            res.sendStatus(400).send(msg);
        }
    };

    // eslint-disable-next-line no-underscore-dangle
    const _save = async ({ permissao }) => {
        if (permissao.id === undefined && permissao.permissao.trim() === '') {
            // eslint-disable-next-line no-throw-literal
            throw 'Descrição inválida!';
        }

        if (permissao.id) {
            const permissao_database = await app.models.permissoes.query()
                .select('*').where('id', permissao.id).first();

            if (permissao_database && permissao_database.id) {
                // eslint-disable-next-line no-param-reassign
                permissao = Object.assign(permissao_database, permissao);
            } else {
                // eslint-disable-next-line no-throw-literal
                throw 'Não foi possível atualizar permissao!';
            }
        }

        return app.models.permissoes.query()
            .upsert(permissao).then((result) => {
                if (result) {
                    return result;
                }
                return true;
            })
            .catch(() => 'Bad request!');
    };

    const save = async (req, res) => {
        const { permissao } = req.body;

        if (req.params.id) permissao.id = Number(req.params.id);

        const data = {
            permissao,
        };

        try {
            const result = await _save(data);

            if (result === true) {
                res.sendStatus(204);
            } else {
                res.json(result);
            }
        } catch (msg) {
            res.status(400).send(msg);
        }
    };

    // eslint-disable-next-line no-underscore-dangle
    const _softDelete = async ({ id }) => {
        const permissao = await app.models.permissoes.query().select('*').where('id', id).first();

        if (permissao && permissao.id) {
            permissao.desativado = 1;
            return app.models.permissoes.query().soft(permissao).catch(() => 'Bad request!');
        }
        // eslint-disable-next-line no-throw-literal
        throw 'Não foi possível excluir permissao!';
    };

    const softDelete = async (req, res) => {
        const { id } = req.params;

        const data = {
            id,
        };

        try {
            const result = await _softDelete(data);
            if (result) {
                res.sendStatus(204);
            }
        } catch (msg) {
            res.sendStatus(400).send(msg);
        }
    };


    const teste = async () => {
        const result = await app.models.permissoes.teste();
        console.log(result);
    };

    return {
        select, save, softDelete, teste,
    };
};
