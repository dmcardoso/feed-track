module.exports = (app) => {
    const { api } = app;

    app.route('/cargos')
        .get(api.cargos.select)
        .post(api.cargos.save);

    app.route('/cargos/:id')
        .put(api.cargos.save);

    app.route('/funcionarios')
        .get(api.funcionarios.select)
        .post(api.funcionarios.save);

    // app.get('/cargos', );
};
