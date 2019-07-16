module.exports = (app) => {
    const { BaseModel } = app.models['base-model'];

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
                },
            };
        }
    }

    return Cargos;
};
