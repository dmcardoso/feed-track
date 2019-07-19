module.exports = (app) => {
    const { api } = app;

    app.route('/cargos')
        .get(api.cargos.select)
        .post(api.cargos.save);

    app.route('/cargos/:id')
        .put(api.cargos.save)
        .delete(api.cargos.softDelete)
        .get(api.cargos.select);

    app.route('/feedbacks')
        .get(api.feedbacks.select)
        .post(api.feedbacks.save);

    app.route('/feedbacks/:id')
        .put(api.feedbacks.save)
        .delete(api.feedbacks.softDelete)
        .get(api.feedbacks.select);

    app.route('/funcionarios')
        .get(api.funcionarios.select)
        .post(api.funcionarios.save);

    // app.get('/cargos', );
};
