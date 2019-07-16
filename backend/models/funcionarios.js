module.exports = (app) => {
    const {BaseModel} = require('../config/database/base-model');
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
                    id: {type: 'integer'},
                    nome: {type: 'string', minLength: 1, maxLength: 240},
                    email: {type: 'email'},
                    nascimento: {type: 'string', format: 'date-time'},
                    senha: {type: 'string'},
                    criacao: {type: 'string', format: 'date-time'},
                },
            };
        }

        static get relationMappings() {
            const Permissoes = require(path.resolve(this.modelPaths, 'permissoes.js'));

            return {
                permissoes: {
                    relation: BaseModel.ManyToManyRelation,
                    modelClass: Permissoes,
                    join: {
                        from: 'funcionarios.id',
                        through: {
                            from: 'funcionarios_permissoes.funcionario',
                            to: 'funcionarios_permissoes.permissao'
                        },
                        to: 'permissoes.id'
                    }
                }
            };
        }
    }

    return Funcionarios;
};
