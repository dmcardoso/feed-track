const path = require('path');
const { BaseModel } = require('../../database/base-model');

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
        descricao,
    }) {
        const query = this.query().select().where('cargos.desativado', 0);

        query.eagerAlgorithm(this.JoinEagerAlgorithm)
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

        if (descricao !== null) {
            query.where('cargos.descricao', 'like', `%${descricao}%`);
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

    static async save(cargo) {
        if (cargo.id) {
            const cargo_database = await this.query().select('*').where('id', cargo.id).first();
            if (cargo_database && cargo_database.id) {
                // eslint-disable-next-line no-param-reassign
                cargo = { ...cargo_database, ...cargo };

                return this.query().upsert(cargo, cargo_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar cargo!';
        }

        return this.query().upsert(cargo)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
    }

    static async softDelete({ id }) {
        const cargo = await this.query().select('*').where('cargos.id', id).where('desativado', '=', '0')
            .first();

        if (cargo && cargo.id) {
            cargo.desativado = 1;
            this.query().soft(cargo)
                .then();
        }
        throw 'Não foi possível excluir cargo!';
    }
}

module.exports = Cargos;
