exports.up = function (knex) {
    return knex.schema.alterTable('funcionarios', (table) => {
        table.text('foto');
        table.enu('sexo', ['m', 'f']);
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('funcionarios', (table) => {
        table.dropColumn('foto');
        table.dropColumn('sexo');
    });
};
