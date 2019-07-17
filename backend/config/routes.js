module.exports = (app) => {
    const { api } = app;

    app.route('/cargos')
        .all(api.cargos.select);

    app.route('/funcionarios')
        .post(api.funcionarios.save);

    // app.get('/cargos', );
};
