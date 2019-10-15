const path = require('path');
const moment = require('moment');
const { BaseModel } = require('../../database/base-model');

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
                historico: { type: 'string' },
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

    static async get({
        id,
        limit,
        search,
        page,
    }) {
        const query = this.query().select();

        query.eagerAlgorithm(this.JoinEagerAlgorithm)
            .eager('funcionario');

        if (id !== 0) {
            query.where('system_logs.id', id);
        } else {
            query.orderBy('system_logs.criacao', 'desc');
        }

        if (search !== null) {
            query.where('system_logs.mensagem', 'like', `%${search}%`);
        }

        if (limit !== null) {
            query.limit(limit);
        }

        if (page !== 1 && limit !== null) {
            query.offset(page * limit - limit);
        }

        if (id !== 0) {
            return query.first().then();
        }

        const results = await query.then();

        results.forEach((value, index) => {
            const getAction = (action) => {
                switch (action) {
                    case 'insert':
                        return 'Criação';
                    case 'update':
                        return 'Atualização';
                    case 'delete':
                        return 'Exclusão';
                    default:
                        return 'Ação';
                }
            };

            const getTable = (group) => {
                switch (group) {
                    case 'cargos':
                        return 'Cargos';
                    case 'feedbacks':
                        return 'Feedbacks';
                    case 'filiais':
                        return 'Filiais';
                    case 'filiais_funcionarios':
                        return 'Filiais Funcionários';
                    case 'funcionarios':
                        return 'Funcionários';
                    case 'funcionarios_permissoes':
                        return 'Funcionários Permissões';
                    case 'permissoes':
                        return 'Permissões';
                    default:
                        return 'Tabela';
                }
            };

            results[index].action_descricao = getAction(value.action);
            results[index].grupo_descricao = getTable(value.grupo);
        });


        console.log(results);

        const total = await query.groupBy('id').resultSize();

        return {
            results,
            total,
        };
    }
}

module.exports = SystemLogs;
