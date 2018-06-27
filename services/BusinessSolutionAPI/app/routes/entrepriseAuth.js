const passport = require('passport'),
      config = require('@config'),
      models = require('@BusinessSolution/app/setup');

const entreprise = require('@models/entreprise.js');

module.exports = (app) => {
    const api = app.BusinessSolutionAPI.app.api.entrepriseAuth;
        
    /*app.route('/v1/entreprise/list')
        .get(passport.authenticate('jwt', config.session), api.index(models.Entreprise, app.get(process.env.JWTSecret)));
        
    app.route('/v1/entreprise/signup')
        .post(api.signup(models.Entreprise));
        
    app.route('/v1/entreprise/auth')
        .post(api.login(entreprise));*/

}