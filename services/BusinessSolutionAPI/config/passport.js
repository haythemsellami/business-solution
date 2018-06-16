const PassportJWT = require('passport-jwt'),
    ExtractJWT = PassportJWT.ExtractJwt,
    Strategy = PassportJWT.Strategy,
    config = require('./index.js'),
    User = require('../app/models/user.js');

module.exports = (passport) => {
    const parameters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };
    passport.use(new Strategy(parameters, (payload, done) => {
        User.findOne({ id: payload.id }, (error, user) => {
            if (error) return done(error, false);
            if (user) done(null, user);
            else done(null, false);
        });
    }));
}
      