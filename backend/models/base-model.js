const { Model } = require('objection');
const { argv } = require('yargs');
const { QueryBuilder } = require('./query-builder');
const db = require('../config/db')(argv);

Model.knex(db);

class BaseModel extends Model {
    static get QueryBuilder() {
        return QueryBuilder;
    }

    static get modelPaths() {
        return [__dirname];
    }
}

module.exports = { BaseModel };
