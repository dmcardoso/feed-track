exports.up = function (knex) {
    return knex.schema.alterTable('feedbacks', (table) => {
        table.date('data_referencia').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('feedbacks', (table) => {
        table.dropColumn('data_referencia');
    });
};
