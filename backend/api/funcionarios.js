const moment = require('moment');
const bcript = require('bcrypt-nodejs');

moment.locale('pt-BR');

module.exports = (app) => {
    const encryptPassword = (password) => {
        const salt = bcript.genSaltSync(10);
        return bcript.hashSync(password, salt);
    };


    const select = async (req, res) => {
        const id = req.query.id || req.params.id || 0;
        const limit = req.query.limit || null;
        const search = req.query.search || null;
        const page = req.query.page || 1;
        const nome = req.query.nome || null;
        const email = req.query.email || null;
        const nascimento = req.query.nascimento || null;

        const query = app.models.funcionarios.query()
            .select('id', 'nome', 'email', 'nascimento', 'criacao', 'desativado').where('desativado', 0);

        if (id !== 0) {
            query.where('id', id);
        }

        const format_nascimento = moment(nascimento, 'DD/MM/YYYY');
        const format_nascimento_search = format_nascimento.format('YYYY-MM-DD');

        if (search !== null) {
            // eslint-disable-next-line func-names
            query.andWhere(function () {
                const format_date = moment(search, 'DD/MM/YYYY');
                const format_date_search = format_date.format('YYYY-MM-DD');

                if (format_date.isValid()) {
                    this.orWhere('nascimento', 'like', `%${format_date_search}%`);
                }
                this.orWhere('nome', 'like', `%${search}%`);
                this.orWhere('email', 'like', `%${search}%`);
            });
        }

        if (nascimento !== null && format_nascimento.isValid()) {
            query.where('nascimento', 'like', `%${format_nascimento_search}%`);
        }

        if (nome !== null) {
            query.where('nome', 'like', `%${nome}%`);
        }

        if (email !== null) {
            query.where('email', 'like', `%${email}%`);
        }

        if (limit !== null) {
            query.limit(limit);
        }

        if (page !== 1 && limit !== null) {
            query.offset(page * limit - limit);
        }

        const funcionarios = await query.then().catch((e) => {
            res.status(400).send('Bad request!');
        });

        res.json(funcionarios);
    };

    const save = async (req, res) => {
        let { funcionario } = req.body;

        if (req.params.id) funcionario.id = Number(req.params.id);

        if (funcionario.senha) funcionario.senha = encryptPassword(funcionario.senha);

        try {
            if (funcionario.id === undefined && funcionario.nome.trim() === '') {
                throw 'Descrição inválida!';
            }
        } catch (msg) {
            res.status(400).send(msg);
        }

        if (funcionario.id) {
            const funcionario_database = await app.models.funcionarios.query()
                .select('*').where('id', funcionario.id).first();

            if (funcionario_database && funcionario_database.id) {
                funcionario = Object.assign(funcionario_database, funcionario);
            } else {
                res.json({ message: 'Não foi possível atualizar funcionario!' });
            }
        }

        app.models.funcionarios.query().upsert(funcionario).then((result) => {
            if (result) {
                res.json(result);
            } else {
                res.sendStatus(204);
            }
        }).catch((e) => {
            console.log(e);
            res.status(400).send('Bad request!');
        });
    };

    const softDelete = async (req, res) => {
        const { id } = req.params;

        const funcionario = await app.models.funcionarios.query().select('*').where('id', id).first();

        if (funcionario && funcionario.id) {
            funcionario.desativado = 1;
            app.models.funcionarios.query().soft(funcionario).then(() => {
                res.sendStatus(204);
            }).catch(() => {
                res.status(400).send('Bad request!');
            });
        } else {
            res.json({ message: 'Não foi possível excluir funcionario!' });
        }
    };

    return { select, save, softDelete };
};
