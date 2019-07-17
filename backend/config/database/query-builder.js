const { QueryBuilder: QueryBuilderObjection } = require('objection');

class QueryBuilder extends QueryBuilderObjection {
    findById(model) {
        if (model.id) {
            return this.select().where('id', model.id);
        }
        throw Error('Id é obgigatório!');
    }
}

module.exports = { QueryBuilder };
