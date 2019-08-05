exports.up = function (knex) {
    return knex.schema.alterTable('cargos', (table) => {
        table.integer('desativado', 1).defaultTo(0);
    })
        .then(() => knex.schema.alterTable('filiais', (table) => {
            table.integer('desativado', 1).defaultTo(0);
        }))
        .then(() => knex.schema.alterTable('funcionarios', (table) => {
            table.integer('desativado', 1).defaultTo(0);
        }))
        .then(() => knex.schema.alterTable('filiais_funcionarios', (table) => {
            table.integer('desativado', 1).defaultTo(0);
        }))
        .then(() => knex.schema.alterTable('feedbacks', (table) => {
            table.integer('desativado', 1).defaultTo(0);
        }))
        .then(() => knex.schema.alterTable('permissoes', (table) => {
            table.integer('desativado', 1).defaultTo(0);
        }))
        .then(() => knex.schema.alterTable('funcionarios_permissoes', (table) => {
            table.integer('desativado', 1).defaultTo(0);
        }));
};

exports.down = function (knex) {
    return knex.schema.alterTable('cargos', (table) => {
        table.dropColumn('desativado');
    })
        .then(() => knex.schema.alterTable('filiais', (table) => {
            table.dropColumn('desativado');
        }))
        .then(() => knex.schema.alterTable('funcionarios', (table) => {
            table.dropColumn('desativado');
        }))
        .then(() => knex.schema.alterTable('filiais_funcionarios', (table) => {
            table.dropColumn('desativado');
        }))
        .then(() => knex.schema.alterTable('feedbacks', (table) => {
            table.dropColumn('desativado');
        }))
        .then(() => knex.schema.alterTable('permissoes', (table) => {
            table.dropColumn('desativado');
        }))
        .then(() => knex.schema.alterTable('funcionarios_permissoes', (table) => {
            table.dropColumn('desativado');
        }));
};
