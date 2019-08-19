module.exports = (app = null) => {
    const { BaseModel } = require('../config/database/base-model');
    const path = require('path');
    const moment = require('moment');
    moment.locale('pt-br');

    class SystemLogs extends BaseModel {
        static get tableName() {
            return 'system_logs';
        }

        static get idColumn() {
            return 'id';
        }

        static get modifiers() {
            return {
                feedbacks(builder) {
                    builder.where('grupo', 'feedbacks');
                },
                cargos(builder) {
                    builder.where('grupo', 'cargos');
                },
                filiais(builder) {
                    builder.where('grupo', 'filiais');
                },
                funcionarios(builder) {
                    builder.where('grupo', 'funcionarios');
                },
                permissoes(builder) {
                    builder.where('grupo', 'permissoes');
                },
                onlyInsert(builder) {
                    builder.where('action', 'insert');
                },
                lastUpdate(builder) {
                    builder.where('action', 'update').orderBy('criacao', 'desc');
                },
                onlyUpdate(builder) {
                    builder.where('action', 'update');
                },
            };
        }

        // eslint-disable-next-line no-unused-vars,class-methods-use-this
        $beforeValidate(jsonSchema, json, opt) {
            // eslint-disable-next-line no-param-reassign
            json.criacao = moment().format('YYYY-MM-DD HH:mm:ss');

            return json;
        }

        static get jsonSchema() {
            return {
                type: 'object',
                required: ['mensagem', 'grupo', 'usuario', 'criacao', 'referencia', 'action'],
                properties: {
                    id: { type: 'integer' },
                    mensagem: { type: 'string', minLength: 1, maxLength: 240 },
                    grupo: { type: 'string', minLength: 1, maxLength: 240 },
                    usuario: { type: 'number' },
                    referencia: { type: 'number' },
                    action: { type: 'string', minLength: 1, maxLength: 240 },
                    criacao: { type: 'string', format: 'date-time' },
                },
            };
        }

        static get relationMappings() {
            /* eslint import/no-dynamic-require: 0 */
            const Funcionarios = require(path.resolve(this.modelPaths, 'funcionarios.js'));

            return {
                funcionario: {
                    relation: BaseModel.BelongsToOneRelation,
                    modelClass: Funcionarios,
                    join: {
                        from: 'system_logs.usuario',
                        to: 'funcionarios.id',
                    },
                },
            };
        }
    }

    return SystemLogs;
};
