module.exports = (app) => {
    const select = async (req, res) => {
        // const cargos = await app.models.cargos.query().select('*');
        const cargos = await app.models.cargos.query().findById({ id: 1 });
        res.send(cargos);
        // console.log();
    };

    return { select };
};
