module.exports = (app) => {
    const { BaseModel } = require('../config/database/base-model');

    class FuncionariosPermissoes extends BaseModel {
        static get tableName() {
            return 'funcionarios_permissoes';
        }

        static get jsonSchema() {
            return {
                type: 'object',
                required: ['funcionario', 'permissao'],
                properties: {
                    funcionario: { type: 'number' },
                    permissao: { type: 'number' },
                    desativado: { type: 'number' },
                },
            };
        }
    }

    return FuncionariosPermissoes;
};
