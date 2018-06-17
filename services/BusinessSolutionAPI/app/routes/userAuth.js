const passport = require('passport'),
      config = require('@config'),
      models = require('@BusinessSolution/app/setup');

const user = require('@models/user.js');

module.exports = (app) => {
  const api = app.BusinessSolutionAPI.app.api.userAuth;

  app.route('/')
  .get((req, res) => res.send('Business Solution API'));

  app.route('/v1/setup')
  .post(api.setup(models.User))
  
  app.route('/v1/users')
  .get(passport.authenticate('jwt', config.session),  api.index(models.User, app.get(process.env.JWTSecret)));

  app.route('/v1/signup')
  .post(api.signup(models.User));

  app.route('/v1/auth')
  .post(api.login(user));
}
