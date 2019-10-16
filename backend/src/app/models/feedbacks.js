const path = require('path');
const moment = require('moment');
const { BaseModel } = require('../../database/base-model');

moment.locale('pt-br');

class Feedbacks extends BaseModel {
    static get tableName() {
        return 'feedbacks';
    }

    static get labelName() {
        return 'Feedback';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'descricao',
                'data_referencia',
                'vendas',
                'cadastros',
                'renovacoes',
                'reativacoes',
                'funcionario',
                'filial',
            ],
            properties: {
                id: { type: 'integer' },
                descricao: { type: 'string' },
                data_referencia: { type: 'string', format: 'date' },
                vendas: { type: 'integer' },
                cadastros: { type: 'integer' },
                renovacoes: { type: 'integer' },
                reativacoes: { type: 'integer' },
                funcionario: { type: 'number' },
                filial: { type: 'number' },
                desativado: { type: 'number' },
            },
        };
    }

    static get relationMappings() {
        /* eslint import/no-dynamic-require: 0 */
        const Filiais = require(path.resolve(this.modelPaths, 'filiais.js'));
        const Funcionarios = require(path.resolve(this.modelPaths, 'funcionarios.js'));
        const SystemLogs = require(path.resolve(this.modelPaths, 'system-logs.js'));

        return {
            filial_feedback: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Filiais,
                join: {
                    from: 'feedbacks.filial',
                    to: 'filiais.id',
                },
            },
            funcionario_feedback: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Funcionarios,
                join: {
                    from: 'feedbacks.funcionario',
                    to: 'funcionarios.id',
                },
            },
            system_logs: {
                relation: BaseModel.HasManyRelation,
                modelClass: SystemLogs,
                join: {
                    from: 'feedbacks.id',
                    to: 'system_logs.referencia',
                },
            },
            inserted: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: SystemLogs,
                join: {
                    from: 'feedbacks.id',
                    to: 'system_logs.referencia',
                },
            },
            updated: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: SystemLogs,
                join: {
                    from: 'feedbacks.id',
                    to: 'system_logs.referencia',
                },
            },
        };
    }

    static async get({
        id,
        limit,
        search,
        page,
        descricao,
        data_referencia,
        vendas,
        cadastros,
        renovacoes,
        reativacoes,
        funcionario,
        filial,
    }) {
        const query = this.query().select().where('feedbacks.desativado', 0);

        query.eagerAlgorithm(this.JoinEagerAlgorithm)
            .eager(`
                    [funcionario_feedback(desativado), 
                    filial_feedback(desativado), 
                    inserted(feedbacks, onlyInsert).funcionario(withOutPass),
                    updated(feedbacks, lastUpdate).funcionario(withOutPass),
                    ]
                `);

        if (id !== 0) {
            query.where('feedbacks.id', id);
        } else {
            query.orderBy('inserted.criacao', 'asc');
        }

        const format_data_referencia_out = moment(data_referencia, 'DD/MM/YYYY');
        const format_data_referencia_search_out = format_data_referencia_out.format('YYYY-MM-DD');

        if (search !== null) {
            // eslint-disable-next-line func-names
            query.andWhere(function () {
                this.orWhere('descricao', 'like', `%${search}%`);

                const format_date = moment(search, 'DD/MM/YYYY');
                const format_date_search = format_date.format('YYYY-MM-DD');
                if (format_date.isValid()) {
                    this.orWhere('inserted.criacao', 'like', `%${format_date_search}%`);
                }

                const format_data_referencia = moment(search, 'DD/MM/YYYY');
                const format_data_referencia_search = format_data_referencia.format('YYYY-MM-DD');

                if (format_data_referencia.isValid()) {
                    this.orWhere('data_referencia', 'like', `%${format_data_referencia_search}%`);
                }

                this.orWhere('vendas', '=', search);
                this.orWhere('cadastros', '=', search);
                this.orWhere('renovacoes', '=', search);
                this.orWhere('reativacoes', '=', search);
                this.orWhere('funcionario_feedback.nome', 'like', `%${search}%`);
                this.orWhere('filial_feedback.filial', 'like', `%${search}%`);
            });
        }

        if (descricao !== null) {
            query.where('descricao', 'like', `%${descricao}%`);
        }

        if (vendas !== null) {
            query.where('vendas', '=', vendas);
        }

        if (cadastros !== null) {
            query.where('cadastros', '=', cadastros);
        }

        if (renovacoes !== null) {
            query.where('renovacoes', '=', renovacoes);
        }

        if (reativacoes !== null) {
            query.where('reativacoes', '=', reativacoes);
        }

        if (data_referencia !== null && format_data_referencia_out.isValid()) {
            query.where('inserted.criacao', 'like', `%${format_data_referencia_search_out}%`);
        }

        if (funcionario !== null) {
            query.where('funcionario_feedback.nome', 'like', `%${funcionario}%`);
        }

        if (filial !== null) {
            query.where('filial_feedback.filial', 'like', `%${filial}%`);
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

    static async estatisticasTotal({
        id,
        limit,
        search,
        data_referencia,
        filial,
    }) {
        const query = this.query().select('feedbacks.data_referencia')
            .sum('feedbacks.renovacoes as total_renovacoes')
            .sum('feedbacks.reativacoes as total_reativacoes')
            .sum('feedbacks.vendas as total_vendas')
            .sum('feedbacks.cadastros as total_cadastros')
            .groupBy('feedbacks.data_referencia')
            .where('feedbacks.desativado', 0);

        // query.eagerAlgorithm(this.JoinEagerAlgorithm)
        //     .eager(`
        //             [funcionario_feedback(desativado),
        //             filial_feedback(desativado),
        //             inserted(feedbacks, onlyInsert).funcionario(withOutPass),
        //             updated(feedbacks, lastUpdate).funcionario(withOutPass),
        //             ]
        //         `);

        if (id !== 0) {
            query.where('feedbacks.id', id);
        }

        const format_data_referencia_out = moment(data_referencia, 'DD/MM/YYYY');
        const format_data_referencia_search_out = format_data_referencia_out.format('YYYY-MM-DD');

        if (search !== null) {
            // eslint-disable-next-line func-names
            query.andWhere(function () {
                this.orWhere('descricao', 'like', `%${search}%`);

                const format_date = moment(search, 'DD/MM/YYYY');
                const format_date_search = format_date.format('YYYY-MM-DD');
                if (format_date.isValid()) {
                    this.orWhere('inserted.criacao', 'like', `%${format_date_search}%`);
                }

                const format_data_referencia = moment(search, 'DD/MM/YYYY');
                const format_data_referencia_search = format_data_referencia.format('YYYY-MM-DD');

                if (format_data_referencia.isValid()) {
                    this.orWhere('data_referencia', 'like', `%${format_data_referencia_search}%`);
                }

                this.orWhere('vendas', '=', search);
                this.orWhere('cadastros', '=', search);
                this.orWhere('renovacoes', '=', search);
                this.orWhere('reativacoes', '=', search);
                this.orWhere('funcionario_feedback.nome', 'like', `%${search}%`);
                this.orWhere('filial_feedback.filial', 'like', `%${search}%`);
            });
        }

        if (data_referencia !== null && format_data_referencia_out.isValid()) {
            query.where('feedbacks.data_referencia', 'like', `%${format_data_referencia_search_out}%`);
        }

        if (filial !== null) {
            query.where('filial_feedback.filial', 'like', `%${filial}%`);
        }

        if (limit !== null) {
            query.limit(limit);
        }

        if (id !== 0) {
            return query.first().then();
        }

        const results = await query.then();

        return {
            results,
        };
    }

    static async save(feedback) {
        if (feedback.id) {
            const feedback_database = await this.query().select('*').where('id', feedback.id).first();
            if (feedback_database && feedback_database.id) {
                // eslint-disable-next-line no-param-reassign
                feedback = { ...feedback_database, ...feedback };

                return this.query().upsert(feedback, feedback_database)
                    .then((result) => {
                        if (result) {
                            return result;
                        }
                        return true;
                    });
            }
            throw 'Não foi possível atualizar feedback!';
        }

        return this.query().upsert(feedback)
            .then((result) => {
                if (result) {
                    return result;
                }
                return true;
            });
    }

    static async softDelete({ id }) {
        const feedback = await this.query().select('*').where('id', id).where('desativado', '=', '0')
            .first();

        if (feedback && feedback.id) {
            feedback.desativado = 1;
            return this.query().soft(feedback)
                .then();
        }
        throw 'Não foi possível excluir feedback!';
    }
}

module.exports = Feedbacks;
