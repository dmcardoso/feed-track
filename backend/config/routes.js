module.exports = (app) => {
    const { api } = app;

    app.route('/cargos')
        .all(api.cargos.select);

    app.route('/funcionarios')
        .all(api.funcionarios.select);

    // app.get('/cargos', );
};
