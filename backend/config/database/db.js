const knex = require('knex');
const config = require('../../knexfile');

module.exports = (args) => {
    const {mode} = args;
    const config_index = (mode && mode === 'dev') ? 'development' : 'production';
    // (config);

    // knex.migrate.latest([config]);

    return knex(config[config_index]);
};
