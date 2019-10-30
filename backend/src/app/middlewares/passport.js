const passport = require('passport');
const passportJwt = require('passport-jwt');
const { authSecret } = require('../../.env');
const Funcionarios = require('../models/funcionarios');

const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    const strategy = new Strategy(params, ((payload, done) => {
        Funcionarios.get({ id: payload.id })
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false));
    }));

    passport.use(strategy);

    return {
        authenticate: () => passport.authenticate('jwt', { session: false }),
    };
};
