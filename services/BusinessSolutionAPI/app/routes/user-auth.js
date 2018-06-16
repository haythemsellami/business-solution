const user = require('@models/user.js');
module.exports = (app) => {
  const api = app.BusinessSolutionAPI.app.api.user-auth;
  app.route('/')
     .get((req, res) => res.send('Business Solution API'));
  app.route('/api/v1/auth')
     .post(api.login(user));
}
