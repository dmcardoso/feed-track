module.exports = (app) => {
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
            const result = await app.models.cargos.get(data);

            res.json(result);
        } catch (msg) {
            res.status(400).send('Bad request!');
        }
    };

    const save = async (req, res) => {
        const { cargo } = req.body;

        if (req.params.id) cargo.id = Number(req.params.id);

        try {
            if (cargo.id === undefined && cargo.descricao.trim() === '') {
                throw 'Descrição inválida!';
            }

            const result = await app.models.cargos.save(cargo);

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
            const result = app.models.cargos.softDelete(data);

            if (result) {
                res.sendStatus(204);
            }
        } catch (msg) {
            res.status(400).send(msg);
        }
    };

    return { select, save, softDelete };
};
