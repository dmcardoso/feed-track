module.exports = (app) => {
    const select = async (req, res) => {
        // const cargos = await app.models.cargos.query().select('*');
        const cargos = await app.models.funcionarios.getById(1);
        res.send(cargos);
        // console.log();
    };
    const save = async (req, res) => {
        // const cargos = await app.models.cargos.query().select('*');
        const cargos = await app.models.funcionarios.query().insert({
            nome: 'Teste carai',
            email: 'emassaassaaaasssail@hotmail.com',
            nascimento: '1999-06-01',
            senha: 'asdasdfa',
            criacao: '1999-06-01 14:25:36',
        });
        res.send(cargos);
        // console.log();
    };

    return { select, save };
};
