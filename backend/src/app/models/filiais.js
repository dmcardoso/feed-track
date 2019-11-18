const path = require('path');
const moment = require('moment');
const { BaseModel } = require('../../database/base-model');

class Filiais extends BaseModel {
    static get tableName() {
        return 'filiais';
    }

    static get labelName() {
        return 'Filial';
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
                fundacao: { type: 'string', format: 'date' },
                desativado: { type: 'number' },
            },
        };
    }

    static get relationMappings() {
        /* eslint import/no-dynamic-require: 0 */
        // const FiliaisFuncionarios = require(path.resolve(this.modelPaths, 'filiais-funcionarios.js'));
        const Funcionarios = require(path.resolve(this.modelPaths, 'funcionarios.js'));
        const Feedbacks = require(path.resolve(this.modelPaths, 'feedbacks.js'));
        const SystemLogs = require(path.resolve(this.modelPaths, 'system-logs.js'));

        return {
            funcionarios_filial: {
                relation: BaseModel.ManyToManyRelation,
                modelClass: Funcionarios,
                join: {
                    from: 'filiais.id',
                    through: {
                        from: 'filiais_funcionarios.filial',
                        to: 'filiais_funcionarios.funcionario',
                    },
                    to: 'funcionarios.id',
                },
            },
            feedbacks_filial: {
                relation: BaseModel.HasManyRelation,
                modelClass: Feedbacks,
                join: {
                    from: 'filiais.id',
                    to: 'feedbacks.filial',
                },
            },
            system_logs: {
                relation: BaseModel.HasManyRelation,
                modelClass: SystemLogs,
                join: {
                    from: 'filiais.id',
                    to: 'system_logs.referencia',
                },
            },
            inserted: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: SystemLogs,
                join: {
                    from: 'filiais.id',
                    to: 'system_logs.referencia',
                },
            },
            updated: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: SystemLogs,
                join: {
                    from: 'filiais.id',
                    to: 'system_logs.referencia',
                },
            },
        };
    }

    static async get({
        id,
        search,
        filial,
        fundacao,
        limit,
        page,
    }) {
        const query = this.query().select().where('filiais.desativado', 0);


        query.eagerAlgorithm(this.JoinEagerAlgorithm)
            .eager(`
                    [inserted(filiais, onlyInsert).funcionario(withOutPass),
                    updated(filiais, lastUpdate).funcionario(withOutPass)]
                `);

        if (id !== 0) {
            query.where('filiais.id', id);
        } else {
            query.orderBy('inserted.criacao', 'asc');
        }

        const format_fundacao = moment(fundacao, 'DD/MM/YYYY');
        const format_fundacao_search = format_fundacao.format('YYYY-MM-DD');

        if (search !== null) {
            // eslint-disable-next-line func-names
            query.where(function () {
                this.orWhere('filial', 'like', `%${search}%`);

                const format_date = moment(search, 'DD/MM/YYYY');
                const format_date_search = format_date.format('YYYY-MM-DD');
                if (format_date.isValid()) {
                    this.orWhere('fundacao', 'like', `%${format_date_search}%`);
                }
            });
        }

        if (filial !== null) {
            query.where('filial', 'like', `%${filial}%`);
        }

        if (fundacao !== null && format_fundacao.isValid()) {
            query.where('fundacao', 'like', `%${format_fundacao_search}%`);
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

        const total = await query.groupBy('id').resultSize();

        return {
            results,
            total,
        };
    }

    static async save(filial) {
        if (filial.id) {
            const filial_database = await this.query().select('*').where('id', filial.id).first();
            if (filial_database && filial_database.id) {
                // eslint-disable-next-line no-param-reassign
                filial = { ...filial_database, ...filial };

                return this.query().upsert(filial, filial_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar filial!';
        }

        return this.query().upsert(filial)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
    }

    static async softDelete({ id }) {
        const filial = await this.query().select('*').where('id', id).where('desativado', '=', '0')
            .first();

        if (filial && filial.id) {
            filial.desativado = 1;

            return this.query().soft(filial)
                .then();
        }
        throw 'Não foi possível excluir filial!';
    }
}

module.exports = Filiais;
