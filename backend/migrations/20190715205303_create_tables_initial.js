/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */

exports.up = function (knex) {
    return knex.schema.createTable('cargos', function (table) {
        table.increments('id').primary();
        table.string('descricao', 240).notNullable();
    })
        .then(function () {
            return knex.schema.createTable('filiais', function (table) {
                table.increments('id').primary();
                table.string('filial', 80).notNullable();
                table.date('fundacao');
                table.dateTime('criacao').notNullable();
            });
        })
        .then(function () {
            return knex.schema.createTable('funcionarios', function (table) {
                table.increments('id').primary();
                table.string('nome', 240).notNullable();
                table.string('email', 240).unique();
                table.date('nascimento');
                table.string('senha').notNullable();
                table.dateTime('criacao').notNullable();
            });
        })
        .then(function () {
            return knex.schema.createTable('filiais_funcionarios', function (table) {
                table.integer('filial', 11).unsigned().notNullable();
                table.integer('funcionario', 11).unsigned().notNullable();
                table.integer('cargo', 11).unsigned().notNullable();

                table.foreign('filial').references('id').inTable('filiais');
                table.foreign('funcionario').references('id').inTable('funcionarios');
                table.foreign('cargo').references('id').inTable('cargos');
            });
        })
        .then(function () {
            return knex.schema.createTable('feedbacks', function (table) {
                table.increments('id').primary();
                table.text('descricao');
                table.dateTime('criacao').notNullable();
                table.integer('vendas', 11).notNullable();
                table.integer('cadastros', 11).notNullable();
                table.integer('renovacoes', 11).notNullable();
                table.integer('reativacoes', 11).notNullable();
                table.integer('funcionario', 11).unsigned().notNullable();
                table.integer('filial', 11).unsigned().notNullable();

                table.foreign('filial').references('id').inTable('filiais');
                table.foreign('funcionario').references('id').inTable('funcionarios');
            });
        })
        .then(function () {
            return knex.schema.createTable('permissoes', function (table) {
                table.increments('id').primary();
                table.string('permissao', 240).notNullable();
            });
        })
        .then(function () {
            return knex.schema.createTable('funcionarios_permissoes', function (table) {
                table.integer('funcionario', 11).unsigned().notNullable();
                table.integer('permissao', 11).unsigned().notNullable();

                table.foreign('funcionario').references('id').inTable('funcionarios');
                table.foreign('permissao').references('id').inTable('permissoes');
            });
        })
        .then(function () {
            return knex.schema.createTable('system_logs', function (table) {
                table.increments('id').primary();
                table.string('mensagem', 240).notNullable();
                table.string('grupo', 240).notNullable();
                table.string('usuario', 240).notNullable();
                table.dateTime('criacao').notNullable();
            });
        });
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('filiais_funcionarios'),
        knex.schema.dropTable('funcionarios_permissoes'),
        knex.schema.dropTable('permissoes'),
        knex.schema.dropTable('feedbacks'),
        knex.schema.dropTable('funcionarios'),
        knex.schema.dropTable('filiais'),
        knex.schema.dropTable('cargos'),
        knex.schema.dropTable('system_logs'),
    ]);
};
