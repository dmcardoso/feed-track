module.exports = (app) => {
    const { BaseModel } = app.models['base-model'];

    class SystemLogs extends BaseModel {
        static get tableName() {
            return 'system-logs';
        }

        static get idColumn() {
            return 'id';
        }

        static get jsonSchema() {
            return {
                type: 'object',
                required: ['mensagem', 'grupo', 'usuario', 'criacao'],
                properties: {
                    id: { type: 'integer' },
                    permissao: { type: 'string', minLength: 1, maxLength: 240 },
                    mensagem: { type: 'string', minLength: 1, maxLength: 240 },
                    grupo: { type: 'string', minLength: 1, maxLength: 240 },
                    usuario: { type: 'integer' },
                    criacao: { type: 'date-time' },
                },
            };
        }
    }

    return SystemLogs;
};
