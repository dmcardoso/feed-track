module.exports = (app) => {
    const { BaseModel } = require('../config/database/base-model');
    const path = require('path');

    class Cargos extends BaseModel {
        static get tableName() {
            return 'cargos';
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
            };
        }
    }

    return Cargos;
};
