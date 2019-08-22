module.exports = (app) => {
    const { BaseModel } = require('../config/database/base-model');
    const path = require('path');

    class Permissoes extends BaseModel {
        static get tableName() {
            return 'permissoes';
        }

        static get labelName() {
            return 'Permissão';
        }

        static get idColumn() {
            return 'id';
        }

        static get jsonSchema() {
            return {
                type: 'object',
                required: ['permissao'],
                properties: {
                    id: { type: 'integer' },
                    permissao: { type: 'string', minLength: 1, maxLength: 240 },
                    desativado: { type: 'number' },
                },
            };
        }

        static get relationMappings() {
            /* eslint import/no-dynamic-require: 0 */
            const FuncionariosPermissoes = require(path.resolve(this.modelPaths, 'funcionarios-permissoes.js'));
            const SystemLogs = require(path.resolve(this.modelPaths, 'system-logs.js'));

            return {
                funcionario_permissoes: {
                    relation: BaseModel.ManyToManyRelation,
                    modelClass: FuncionariosPermissoes,
                    join: {
                        from: 'permissoes.id',
                        through: {
                            from: 'funcionarios_permissoes.funcionario',
                            to: 'funcionarios_permissoes.permissao',
                        },
                        to: 'funcionarios.id',
                    },
                },
                system_logs: {
                    relation: BaseModel.HasManyRelation,
                    modelClass: SystemLogs,
                    join: {
                        from: 'permissoes.id',
                        to: 'system_logs.referencia',
                    },
                },
                inserted: {
                    relation: BaseModel.BelongsToOneRelation,
                    modelClass: SystemLogs,
                    join: {
                        from: 'permissoes.id',
                        to: 'system_logs.referencia',
                    },
                },
                updated: {
                    relation: BaseModel.BelongsToOneRelation,
                    modelClass: SystemLogs,
                    join: {
                        from: 'permissoes.id',
                        to: 'system_logs.referencia',
                    },
                },
            };
        }

        static async get({
            id, limit, search, page,
        }) {
            const query = this.query().select().where('permissoes.desativado', 0);

            query.eagerAlgorithm(app.models.permissoes.JoinEagerAlgorithm)
                .eager(`
                    [inserted(permissoes, onlyInsert).funcionario(withOutPass),
                    updated(permissoes, lastUpdate).funcionario(withOutPass)]
                `);

            if (id !== 0) {
                query.where('permissoes.id', id);
            } else {
                query.orderBy('inserted.criacao', 'asc');
            }

            if (search !== null) {
                query.where('permissao', 'like', `%${search}%`);
            }

            if (limit !== null) {
                query.limit(limit);
            }

            if (page !== 1 && limit !== null) {
                query.offset(page * limit - limit);
            }

            if (id !== 0) {
                return query.first().then();
            }

            const results = await query.then();

            const total = await query.groupBy('id').resultSize();

            return {
                results,
                total,
            };
        }

        static async save(permissao) {
            if (permissao.id) {
                const permissao_database = await this.query()
                    .select('*').where('id', permissao.id).first();

                if (permissao_database && permissao_database.id) {
                    // eslint-disable-next-line no-param-reassign
                    permissao = { ...permissao_database, ...permissao };

                    return this.query()
                        .upsert(permissao, permissao_database)
                        .then((result) => {
                            if (result) {
                                return result;
                            }
                            return true;
                        });
                }
                // eslint-disable-next-line no-throw-literal
                throw 'Não foi possível atualizar permissao!';
            }

            return this.query()
                .upsert(permissao)
                .then((result) => {
                    if (result) {
                        return result;
                    }
                    return true;
                });
        }

        static async softDelete({ id }) {
            const permissao = await this.query().select('*').where('id', id).where('desativado', '=', '0')
                .first();

            if (permissao && permissao.id) {
                permissao.desativado = 1;
                return this.query().soft(permissao)
                    .then();
            }
            // eslint-disable-next-line no-throw-literal
            throw 'Não foi possível excluir permissao!';
        }
    }

    return Permissoes;
};
