exports.up = function (knex) {
    return knex.schema.alterTable('system_logs', (table) => {
        table.integer('referencia', 11);
        table.string('action', 240).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('system_logs', (table) => {
        table.dropColumn('referencia');
        table.dropColumn('action');
    });
};
