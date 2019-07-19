const { Model } = require('objection');
const { argv } = require('yargs');
const path = require('path');
const format = require('date-fns/format');
const isValid = require('date-fns/is_valid');
const parse = require('date-fns/parse');
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

            if (schema.format === 'date-time' && value instanceof Date) {
                json[prop] = format(value, 'DD/MM/YYYY HH:mm:ss');
            } else if (schema.format === 'date' && value instanceof Date) {
                json[prop] = format(value, 'DD/MM/YYYY');
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
            const date = parse(field);

            if (schema.format === 'date-time' && isValid(date)) {
                this[value] = format(date, 'YYYY-MM-DD HH:mm:ss');
            } else if (schema.format === 'date' && isValid(date)) {
                this[value] = format(date, 'YYYY-MM-DD');
            }
        });
    }

    $parseJson(json, opt) {
        const object = {};

        const propSchemas = this.constructor.jsonSchema.properties;
        Object.entries(json).forEach(([idx, value]) => {
            const schema = propSchemas[idx];
            const date = parse(value);

            if (schema.format === 'date-time' && isValid(date)) {
                object[idx] = date.toISOString();
            } else if (schema.format === 'date' && isValid(date)) {
                object[idx] = `${date.toISOString().split('T')[0]}`;
            } else {
                object[idx] = value;
            }
        });

        return object;
    }
}

module.exports = { BaseModel };
