module.exports = (app) => {
    const { BaseModel } = require('../config/database/base-model');
    const path = require('path');

    class Funcionarios extends BaseModel {
        static get tableName() {
            return 'funcionarios';
        }

        static get idColumn() {
            return 'id';
        }

        static get jsonSchema() {
            return {
                type: 'object',
                required: ['nome', 'email', 'nascimento', 'senha', 'criacao'],
                properties: {
                    id: { type: 'integer' },
                    nome: { type: 'string', minLength: 1, maxLength: 240 },
                    email: { type: 'email' },
                    nascimento: { type: 'string', format: 'date' },
                    senha: { type: 'string' },
                    criacao: { type: 'string', format: 'date-time' },
                },
            };
        }

        static get relationMappings() {
            /* eslint import/no-dynamic-require: 0 */
            const Permissoes = require(path.resolve(this.modelPaths, 'permissoes.js'));
            const Feedbacks = require(path.resolve(this.modelPaths, 'feedbacks.js'));
            const Cargos = require(path.resolve(this.modelPaths, 'cargos.js'));

            return {
                permissoes: {
                    relation: BaseModel.ManyToManyRelation,
                    modelClass: Permissoes,
                    join: {
                        from: 'funcionarios.id',
                        through: {
                            from: 'funcionarios_permissoes.funcionario',
                            to: 'funcionarios_permissoes.permissao',
                        },
                        to: 'permissoes.id',
                    },
                },
                feedbacks: {
                    relation: BaseModel.HasManyRelation,
                    modelClass: Feedbacks,
                    join: {
                        from: 'funcionarios.id',
                        to: 'feedbacks.funcionario',
                    },
                },
                cargos: {
                    relation: BaseModel.ManyToManyRelation,
                    modelClass: Cargos,
                    join: {
                        from: 'funcionarios.id',
                        through: {
                            from: 'filiais_funcionarios.funcionario',
                            to: 'filiais_funcionarios.cargo',
                        },
                        to: 'cargos.id',
                    },
                },
            };
        }
    }

    return Funcionarios;
};
