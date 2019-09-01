const { BaseModel } = require('../../database/base-model');

class FiliaisFuncionarios extends BaseModel {
    static get tableName() {
        return 'filiais_funcionarios';
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
