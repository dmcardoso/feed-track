module.exports = (app) => {
    const { BaseModel } = require('../config/database/base-model');
    const path = require('path');

    class Cargos extends BaseModel {
        static get tableName() {
            return 'cargos';
        }

        static get labelName() {
            return 'Cargo';
        }

        static get idColumn() {
            return 'id';
        }

        static get jsonSchema() {
            return {
                type: 'object',
                required: ['descricao'],
                properties: {
                    id: { type: 'integer' },
                    descricao: { type: 'string', minLength: 1, maxLength: 240 },
                    desativado: { type: 'number' },
                },
            };
        }

        static get relationMappings() {
            /* eslint import/no-dynamic-require: 0 */
            const FiliaisFuncionarios = require(path.resolve(this.modelPaths, 'filiais-funcionarios.js'));
            const Filiais = require(path.resolve(this.modelPaths, 'filiais.js'));
            const SystemLogs = require(path.resolve(this.modelPaths, 'system-logs.js'));

            return {
                funcionario_cargos: {
                    relation: BaseModel.ManyToManyRelation,
                    modelClass: FiliaisFuncionarios,
                    join: {
                        from: 'cargos.id',
                        through: {
                            from: 'filiais_funcionarios.cargo',
                            to: 'filiais_funcionarios.funcionario',
                        },
                        to: 'funcionarios.id',
                    },
                },
                filial_cargo: {
                    relation: BaseModel.ManyToManyRelation,
                    modelClass: Filiais,
                    join: {
                        from: 'cargos.id',
                        through: {
                            from: 'filiais_funcionarios.cargo',
                            to: 'filiais_funcionarios.filial',
                        },
                        to: 'filiais.id',
                    },
                },
                system_logs: {
                    relation: BaseModel.HasManyRelation,
                    modelClass: SystemLogs,
                    join: {
                        from: 'feedbacks.id',
                        to: 'system_logs.referencia',
                    },
                },
                inserted: {
                    relation: BaseModel.BelongsToOneRelation,
                    modelClass: SystemLogs,
                    join: {
                        from: 'cargos.id',
                        to: 'system_logs.referencia',
                    },
                },
                updated: {
                    relation: BaseModel.BelongsToOneRelation,
                    modelClass: SystemLogs,
                    join: {
                        from: 'cargos.id',
                        to: 'system_logs.referencia',
                    },
                },
            };
        }

        static async get({
            id,
            limit,
            search,
            page,
        }) {
            const query = this.query().select().where('cargos.desativado', 0);

            query.eagerAlgorithm(app.models.cargos.JoinEagerAlgorithm)
                .eager(`
                    [inserted(cargos, onlyInsert).funcionario(withOutPass),
                    updated(cargos, lastUpdate).funcionario(withOutPass)]
                `);

            if (id !== 0) {
                query.where('cargos.id', id);
            } else {
                query.orderBy('inserted.criacao', 'asc');
            }

            if (search !== null) {
                query.where('descricao', 'like', `%${search}%`);
            }

            if (limit !== null) {
                query.limit(limit);
            }

            if (page !== 1 && limit !== null) {
                query.offset(page * limit - limit);
            }

            if (id !== 0) return query.first().then();
            return query.then();
        }

        static async save(cargo) {
            let action = 'insert';
            if (cargo.id) {
                action = 'update';
                const cargo_database = await app.models.cargos.query().select('*').where('id', cargo.id).first();
                if (cargo_database && cargo_database.id) {
                    // eslint-disable-next-line no-param-reassign
                    cargo = Object.assign(cargo_database, cargo);
                } else {
                    throw 'Não foi possível atualizar cargo!';
                }
            }

            return this.query().upsert(cargo)
                .then((result) => {
                    if (result) {
                        return result;
                    }
                    return true;
                })
                .catch(() => 'Bad request');
        }

        static async softDelete({ id }) {
            const cargo = await this.query().select('*').where('cargos.id', id).first();

            if (cargo && cargo.id) {
                cargo.desativado = 1;
                this.query().soft(cargo)
                    .then()
                    .catch(() => 'Bad request!');
            }
            throw 'Não foi possível excluir cargo!';
        }
    }

    return Cargos;
};
