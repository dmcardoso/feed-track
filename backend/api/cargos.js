module.exports = (app) => {
    const select = async (req, res) => {
        const id = req.query.id || 0;
        const limit = req.query.limit || null;
        const search = req.query.search || null;
        const page = req.query.page || 1;

        const query = app.models.cargos.query().select('*');

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

        const cargos = await query.then(result => result).catch(() => {
            res.status(400).send('Bad request');
        });

        res.send(cargos);
    };
    const save = async (req, res) => {
        // console.log(req);
        console.log(req.body);
        console.log(req.params);
    };
    const softDelete = async (req, res) => {
    };

    return { select, save, softDelete };
};
