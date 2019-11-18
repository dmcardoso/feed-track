exports.up = function (knex) {
    return knex.schema.alterTable('feedbacks', (table) => {
        table.dropColumn('criacao');
    })
        .then(() => knex.schema.alterTable('filiais', (table) => {
            table.dropColumn('criacao');
        }))
        .then(() => knex.schema.alterTable('funcionarios', (table) => {
            table.dropColumn('criacao');
        }));
};

exports.down = function (knex) {
    return knex.schema.alterTable('feedbacks', (table) => {
        table.dateTime('criacao').notNullable();
    }).then(() => knex.schema.alterTable('filiais', (table) => {
        table.dateTime('criacao').notNullable();
    })).then(() => knex.schema.alterTable('funcionarios', (table) => {
        table.dateTime('criacao').notNullable();
    }));
};
