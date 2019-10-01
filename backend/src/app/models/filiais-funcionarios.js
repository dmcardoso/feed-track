const path = require('path');
const { BaseModel } = require('../../database/base-model');

class FiliaisFuncionarios extends BaseModel {
    static get tableName() {
        return 'filiais_funcionarios';
    }

    static get relationMappings() {
        /* eslint import/no-dynamic-require: 0 */
        const Filiais = require(path.resolve(this.modelPaths, 'filiais.js'));
        const SystemLogs = require(path.resolve(this.modelPaths, 'system-logs.js'));

        return {
            filial_funcionarios: {
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

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['filial', 'funcionario', 'cargo'],
            properties: {
                filial: { type: 'number' },
                funcionario: { type: 'number' },
                cargo: { type: 'number' },
                desativado: { type: 'number' },
            },
        };
    }
}

module.exports = FiliaisFuncionarios;
