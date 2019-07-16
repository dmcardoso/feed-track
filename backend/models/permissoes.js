module.exports = (app = null) => {
    const {BaseModel} = require('../config/database/base-model');

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
                    id: {type: 'integer'},
                    permissao: {type: 'string', minLength: 1, maxLength: 240},
                },
            };
        }
    }

    return Permissoes;
};
