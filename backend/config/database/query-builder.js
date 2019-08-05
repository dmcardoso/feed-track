const { QueryBuilder: QueryBuilderObjection } = require('objection');
const path = require('path');

class QueryBuilder extends QueryBuilderObjection {
    upsert(model) {
        // eslint-disable-next-line no-underscore-dangle
        const model_class = this._modelClass;

        if (model.id) {
            return this.update(model).where('id', model.id)
                .runAfter(async (result) => {
                    const log = {
                        // eslint-disable-next-line max-len
                        mensagem: `${model_class.labelName} {{${model_class.tableName}_id}} atualizado pelo usuário {{usuario_id}}`,
                        grupo: model_class.tableName,
                        usuario: 1,
                        referencia: model.id,
                        action: 'update',
                    };

                    if (result) {
                        try {
                            // eslint-disable-next-line import/no-dynamic-require
                            const SystemLogs = require(path.resolve(model_class.modelPaths, 'system-logs.js'));

                            SystemLogs().query().insert(log).then();
                        } catch (msg) {
                            throw msg;
                        }
                    }

                    return result;
                });
        }
        return this.insert(model)
            .runAfter(async (result) => {
                const log = {
                    // eslint-disable-next-line max-len
                    mensagem: `${model_class.labelName} {{${model_class.tableName}_id}} inserido pelo usuário {{usuario_id}}`,
                    grupo: model_class.tableName,
                    usuario: 1,
                    referencia: result.id,
                    action: 'insert',
                };

                if (result) {
                    try {
                        // eslint-disable-next-line import/no-dynamic-require
                        const SystemLogs = require(path.resolve(model_class.modelPaths, 'system-logs.js'));

                        const system_log = await SystemLogs().query().insert(log);

                        // eslint-disable-next-line no-param-reassign
                        result.inserted = system_log;
                    } catch (msg) {
                        throw msg;
                    }
                }

                return result;
            });
    }

    soft(model) {
        if (model.id) {
            const model_class = this._modelClass;

            return this.update(model).where('id', model.id)
                .runAfter(async (result) => {
                    const log = {
                        // eslint-disable-next-line max-len
                        mensagem: `${model_class.labelName} {{${model_class.tableName}_id}} excluído pelo usuário {{usuario_id}}`,
                        grupo: model_class.tableName,
                        usuario: 1,
                        referencia: model.id,
                        action: 'delete',
                    };

                    if (result) {
                        try {
                            // eslint-disable-next-line import/no-dynamic-require
                            const SystemLogs = require(path.resolve(model_class.modelPaths, 'system-logs.js'));

                            SystemLogs().query().insert(log).then();
                        } catch (msg) {
                            throw msg;
                        }
                    }

                    return result;
                });
        }
        throw Error('Id é obgigatório!');
    }
}

module.exports = { QueryBuilder };
