module.exports = (app) => {
    const { BaseModel } = require('../config/database/base-model');
    const path = require('path');

    class Feedbacks extends BaseModel {
        static get tableName() {
            return 'feedbacks';
        }

        static get idColumn() {
            return 'id';
        }

        static get jsonSchema() {
            return {
                type: 'object',
                required: [
                    'descricao',
                    'criacao',
                    'vendas',
                    'cadastros',
                    'renovacoes',
                    'reativacoes',
                    'funcionario',
                    'filial',
                ],
                properties: {
                    id: { type: 'integer' },
                    descricao: { type: 'string' },
                    criacao: { type: 'string', format: 'date-time' },
                    vendas: { type: 'integer' },
                    cadastros: { type: 'integer' },
                    renovacoes: { type: 'integer' },
                    reativacoes: { type: 'integer' },
                    funcionario: { type: 'number' },
                    filial: { type: 'number' },
                    desativado: { type: 'number' },
                },
            };
        }

        static get relationMappings() {
            /* eslint import/no-dynamic-require: 0 */
            const Filiais = require(path.resolve(this.modelPaths, 'filiais.js'));
            const Funcionarios = require(path.resolve(this.modelPaths, 'funcionarios.js'));

            return {
                filial_feedback: {
                    relation: BaseModel.HasManyRelation,
                    modelClass: Filiais,
                    join: {
                        from: 'feedbacks.filial',
                        to: 'filiais.id',
                    },
                },
                funcionarios: {
                    relation: BaseModel.BelongsToOneRelation,
                    modelClass: Funcionarios,
                    join: {
                        from: 'feedbacks.funcionario',
                        to: 'funcionarios.id',
                    },
                },
            };
        }
    }

    return Feedbacks;
};
