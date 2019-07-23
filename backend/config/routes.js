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

    app.route('/filiais')
        .get(api.filiais.select)
        .post(api.filiais.save);

    app.route('/filiais/:id')
        .put(api.filiais.save)
        .delete(api.filiais.softDelete)
        .get(api.filiais.select);

    app.route('/funcionarios')
        .get(api.funcionarios.select)
        .post(api.funcionarios.save);

    app.route('/funcionarios/:id')
        .put(api.funcionarios.save)
        .delete(api.funcionarios.softDelete)
        .get(api.funcionarios.select);

    app.route('/permissoes')
        .get(api.permissoes.select)
        .post(api.permissoes.save);

    app.route('/permissoes/:id')
        .put(api.permissoes.save)
        .delete(api.permissoes.softDelete)
        .get(api.permissoes.select);
};
