const {Model} = require('objection');
const {argv} = require('yargs');
const {QueryBuilder} = require('./query-builder');
const db = require('./db')(argv);
const path = require('path');

Model.knex(db);

class BaseModel extends Model {
    static get QueryBuilder() {
        return QueryBuilder;
    }

    static get modelPaths() {
        return path.resolve(__dirname, '../../models/');
    }
}

module.exports = {BaseModel};
