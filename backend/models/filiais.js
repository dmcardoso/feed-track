module.exports = (app) => {
    const { BaseModel } = require('../config/database/base-model');
    const path = require('path');

    class Filiais extends BaseModel {
        static get tableName() {
            return 'filiais';
        }

        static get idColumn() {
            return 'id';
        }

        static get jsonSchema() {
            return {
                type: 'object',
                required: ['filial'],
                properties: {
                    id: { type: 'integer' },
                    filial: { type: 'string', minLength: 1, maxLength: 80 },
                    fundacao: { type: 'string', format: 'date-time' },
                    criacao: { type: 'string', format: 'date-time' },
                    desativado: { type: 'number' },
                },
            };
        }

        static get relationMappings() {
            /* eslint import/no-dynamic-require: 0 */
            const FiliaisFuncionarios = require(path.resolve(this.modelPaths, 'filiais-funcionarios.js'));
            const Feedbacks = require(path.resolve(this.modelPaths, 'feedbacks.js'));

            return {
                funcionarios_filial: {
                    relation: BaseModel.ManyToManyRelation,
                    modelClass: FiliaisFuncionarios,
                    join: {
                        from: 'filiais.id',
                        through: {
                            from: 'filiais_funcionarios.filial',
                            to: 'filiais_funcionarios.funcionario',
                        },
                        to: 'funcionarios.id',
                    },
                },
                feedbacks_filial: {
                    relation: BaseModel.HasManyRelation,
                    modelClass: Feedbacks,
                    join: {
                        from: 'filiais.id',
                        to: 'feedbacks.filial',
                    },
                },
            };
        }
    }

    return Filiais;
};
