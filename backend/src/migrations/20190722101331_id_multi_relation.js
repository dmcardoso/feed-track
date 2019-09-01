exports.up = function (knex) {
    return knex.schema.alterTable('filiais_funcionarios', (table) => {
        table.increments('id').primary();
    })
        .then(() => knex.schema.alterTable('funcionarios_permissoes', (table) => {
            table.increments('id').primary();
        }));
};

exports.down = function (knex) {
    return knex.schema.alterTable('filiais_funcionarios', (table) => {
        table.dropColumn('id');
    }).then(() => knex.schema.alterTable('funcionarios_permissoes', (table) => {
        table.dropColumn('id');
    }));
};
