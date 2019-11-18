const path = require('path');
const { BaseModel } = require('../../database/base-model');

class FiliaisFuncionarios extends BaseModel {
    static get tableName() {
        return 'filiais_funcionarios';
    }

    static get labelName() {
        return 'Relação de Funcionário';
    }


    static get relationMappings() {
        /* eslint import/no-dynamic-require: 0 */
        const Filiais = require(path.resolve(this.modelPaths, 'filiais.js'));
        const Funcionarios = require(path.resolve(this.modelPaths, 'funcionarios.js'));
        const Cargos = require(path.resolve(this.modelPaths, 'cargos.js'));
        const SystemLogs = require(path.resolve(this.modelPaths, 'system-logs.js'));

        return {
            funcionario_filial: {
                relation: BaseModel.HasOneRelation,
                modelClass: Funcionarios,
                join: {
                    from: 'filiais_funcionarios.funcionario',
                    to: 'funcionarios.id',
                },
            },
            filial_funcionario: {
                relation: BaseModel.HasOneRelation,
                modelClass: Filiais,
                join: {
                    from: 'filiais_funcionarios.filial',
                    to: 'filiais.id',
                },
            },
            cargo_funcionario: {
                relation: BaseModel.HasOneRelation,
                modelClass: Cargos,
                join: {
                    from: 'filiais_funcionarios.cargo',
                    to: 'cargos.id',
                },
            },
            system_logs: {
                relation: BaseModel.HasManyRelation,
                modelClass: SystemLogs,
                join: {
                    from: 'filiais_funcionarios.id',
                    to: 'system_logs.referencia',
                },
            },
            inserted: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: SystemLogs,
                join: {
                    from: 'filiais_funcionarios.id',
                    to: 'system_logs.referencia',
                },
            },
            updated: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: SystemLogs,
                join: {
                    from: 'filiais_funcionarios.id',
                    to: 'system_logs.referencia',
                },
            },
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['filial', 'funcionario', 'cargo'],
            properties: {
                id: { type: 'integer' },
                filial: { type: 'number' },
                funcionario: { type: 'number' },
                cargo: { type: 'number' },
                desativado: { type: 'number' },
            },
        };
    }

    static async get({
        filial,
        funcionario,
        cargo,
        limit,
        page,
    }) {
        const query = this.query()
            .select()
            .where('filiais_funcionarios.desativado', 0);

        query.eagerAlgorithm(this.JoinEagerAlgorithm)
            .eager(`
                    [filial_funcionario,
                    cargo_funcionario,
                    funcionario_filial(withOutPass)
                    ]
                `);

        // inserted(filiais, onlyInsert).funcionario(withOutPass),
        //     updated(filiais, lastUpdate).funcionario(withOutPass)

        if (filial !== null) {
            query.where('filiais_funcionarios.filial', filial);
        }

        if (funcionario !== null) {
            query.where('filiais_funcionarios.funcionario', funcionario);
        }

        if (cargo !== null) {
            query.where('filiais_funcionarios.cargo', cargo);
        }

        if (limit !== null) {
            query.limit(limit);
        }

        if (page !== 1 && limit !== null) {
            query.offset(page * limit - limit);
        }

        const results = await query.then();

        const total = await query.groupBy('id').resultSize();

        return {
            results,
            total,
        };
    }

    static async save(funcionario_filial) {
        if (funcionario_filial.id) {
            const funcionario_filial_database = await this.query().select('*').where('id', funcionario_filial.id).first();
            if (funcionario_filial_database && funcionario_filial_database.id) {
                // eslint-disable-next-line no-param-reassign
                funcionario_filial = { ...funcionario_filial_database, ...funcionario_filial };

                return this.query().upsert(funcionario_filial, funcionario_filial_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar filial!';
        }

        return this.query().upsert(funcionario_filial)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
    }

    static async softDelete({ id }) {
        const filial_funcionario = await this.query().select('*').where('id', id).where('desativado', '=', '0')
            .first();

        if (filial_funcionario && filial_funcionario.id) {
            filial_funcionario.desativado = 1;

            return this.query().soft(filial_funcionario)
                .then();
        }
        throw 'Não foi possível excluir filial!';
    }
}

module.exports = FiliaisFuncionarios;
