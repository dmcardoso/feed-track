module.exports = (app) => {
    const { api } = app;

    app.route('/cargos')
        .all(api.cargos.select);

    app.route('/funcionarios')
        .get(api.funcionarios.select)
        .post(api.funcionarios.save);

    // app.get('/cargos', );
};
