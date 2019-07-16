module.exports = (app) => {
    const { BaseModel } = app.models['base-model'];

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
                    nascimento: { type: 'date-time' },
                    senha: { type: 'string' },
                    criacao: { type: 'date-time' },
                },
            };
        }
    }

    return Funcionarios;
};
