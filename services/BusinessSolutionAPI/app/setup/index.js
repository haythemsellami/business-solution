const mongoose = require('mongoose'),
    UserModel = require('../models/user.js'),
    EntrepriseModel = require('../models/entreprise.js');

const models = {
    User: mongoose.model('User'),
    Entreprise: mongoose.model('Entreprise')
}
module.exports = models;
