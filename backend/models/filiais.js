module.exports = (app) => {
    const { BaseModel } = app.models['base-model'];

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
                    fundacao: { type: 'date-time' },
                    criacao: { type: 'date-time' },
                },
            };
        }
    }

    return Filiais;
};
