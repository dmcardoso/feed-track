module.exports = (app) => {
    const select = async (req, res) => {
        // const cargos = await app.models.cargos.query().select('*');
        const cargos = await app.models.funcionarios.getById(1);
        res.send(cargos);
        // console.log();
    };
    const save = async (req, res) => {
        console.log('oisss');
        // const cargos = await app.models.cargos.query().select('*');
        const cargos = await app.models.funcionarios.query().insert({
            nome: 'Teste carai',
            email: 'emassaassaaaasssail@hotmail.com',
            nascimento: '2019-07-09',
            senha: 'asdasdfa',
            criacao: '2019-07-09 08:14:44',
        });
        res.send(cargos);
        // console.log();
    };

    return { select, save };
};
