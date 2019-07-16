module.exports = (app) => {
    const { api } = app;

    app.route('/cargos')
        .all(api.cargos.select);

    // app.get('/cargos', );
};
