module.exports = (app) => {
    const { BaseModel } = app.models['base-model'];

    class FuncionariosPermissoes extends BaseModel {
        static get tableName() {
            return 'funcionarios_permissoes';
        }

        static get jsonSchema() {
            return {
                type: 'object',
                required: ['funcionario', 'permissao'],
                properties: {
                    funcionario: { type: 'number' },
                    permissao: { type: 'number' },
                },
            };
        }

        static get relationMappings() {
            // TODO many to many
            return {
                permissoes: {
                    relation: BaseModel.BelongsToOneRelation,
                    modelClass: app.models.permissoes,
                    join: {
                        from: 'categorias.id',
                        to: 'usuarios.categoria',
                    },
                },
            };
        }
    }

    return FuncionariosPermissoes;
};
