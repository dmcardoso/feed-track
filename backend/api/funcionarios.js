module.exports = (app) => {
    const select = async (req, res) => {
        // const cargos = await app.models.cargos.query().select('*');
        const cargos = await app.models.funcionarios.query().joinRelation('permissoes', {alias: 'p'});
        res.send(cargos);
        // console.log();
    };

    return {select};
};
