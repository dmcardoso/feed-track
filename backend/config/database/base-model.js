const { Model } = require('objection');
const { argv } = require('yargs');
const path = require('path');
const moment = require('moment');

moment.locale('pt-BR');
const db = require('./db')(argv);
const { QueryBuilder } = require('./query-builder');

Model.knex(db);

class BaseModel extends Model {
    static get QueryBuilder() {
        return QueryBuilder;
    }

    static get modelPaths() {
        return path.resolve(__dirname, '../../models/');
    }

    $parseDatabaseJson(json) {
        /* eslint no-param-reassign: 0 */
        json = super.$parseDatabaseJson(json);

        const propSchemas = this.constructor.jsonSchema.properties;

        Object.keys(propSchemas).forEach((prop) => {
            const schema = propSchemas[prop];
            const value = json[prop];

            if (schema.format === 'date-time') {
                const new_value = moment(value, 'YYYY-MM-DD HH:mm:ss');
                if (new_value.isValid()) {
                    json[prop] = new_value.format('DD/MM/YYYY HH:mm:ss');
                }
            } else if (schema.format === 'date') {
                const new_value = moment(value, 'YYYY-MM-DD');
                if (new_value.isValid()) {
                    json[prop] = new_value.format('DD/MM/YYYY');
                }
            }
        });

        return json;
    }


    $beforeInsert(queryContext) {
        super.$beforeInsert(queryContext);

        const propSchemas = this.constructor.jsonSchema.properties;

        Object.keys(this).forEach((value, index) => {
            const schema = propSchemas[value];
            const field = this[value];

            if (schema.format === 'date-time') {
                const new_value = moment(field, 'DD/MM/YYYY HH:mm:ss');
                if (new_value.isValid()) {
                    this[value] = new_value.format('YYYY-MM-DD HH:mm:ss');
                }
            } else if (schema.format === 'date') {
                const new_value = moment(field, 'DD/MM/YYYY');
                if (new_value.isValid()) {
                    this[value] = new_value.format('YYYY-MM-DD');
                }
            }
        });
    }

    $afterInsert(queryContext) {
        super.$afterInsert(queryContext);

        const propSchemas = this.constructor.jsonSchema.properties;

        Object.keys(this).forEach((value, index) => {
            const schema = propSchemas[value];
            const field = this[value];

            if (schema.format === 'date-time') {
                const new_value = moment(field);
                if (new_value.isValid()) {
                    this[value] = new_value.format('DD-MM-YYYY HH:mm:ss');
                }
            } else if (schema.format === 'date') {
                const new_value = moment(field);
                if (new_value.isValid()) {
                    this[value] = new_value.format('DD/MM/YYYY');
                }
            }
        });
    }

    $beforeUpdate(opt, queryContext) {
        super.$beforeUpdate(opt, queryContext);

        const propSchemas = this.constructor.jsonSchema.properties;

        Object.keys(this).forEach((value, index) => {
            const schema = propSchemas[value];
            const field = this[value];

            if (schema.format === 'date-time') {
                const new_value = moment(field, 'DD/MM/YYYY HH:mm:ss');
                if (new_value.isValid()) {
                    this[value] = new_value.format('YYYY-MM-DD HH:mm:ss');
                }
            } else if (schema.format === 'date') {
                const new_value = moment(field, 'DD/MM/YYYY');
                if (new_value.isValid()) {
                    this[value] = new_value.format('YYYY-MM-DD');
                }
            }
        });
    }

    $parseJson(json, opt) {
        const object = {};

        const propSchemas = this.constructor.jsonSchema.properties;

        Object.entries(json).forEach(([idx, value]) => {
            const schema = propSchemas[idx];

            if (schema.format === 'date-time') {
                const date = moment(value, 'DD/MM/YYYY HH:mm:ss');
                if (date.isValid()) {
                    object[idx] = date.toISOString();
                }
            } else if (schema.format === 'date') {
                const date = moment(value, 'DD/MM/YYYY');
                if (date.isValid()) {
                    object[idx] = date.format('YYYY-MM-DD');
                }
            } else {
                object[idx] = value;
            }
        });

        return object;
    }
}

module.exports = { BaseModel };
