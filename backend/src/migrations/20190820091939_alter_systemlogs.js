exports.up = function (knex) {
    return knex.schema.alterTable('system_logs', (table) => {
        table.text('historico');
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('system_logs', (table) => {
        table.dropColumn('historico');
    });
};
