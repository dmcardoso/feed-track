module.exports = (app = null) => {
    const { BaseModel } = require('../config/database/base-model');
    const path = require('path');

    class Permissoes extends BaseModel {
        static get tableName() {
            return 'permissoes';
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
            };
        }
    }

    return Permissoes;
};
