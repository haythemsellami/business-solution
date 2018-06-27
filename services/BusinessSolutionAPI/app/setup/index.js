const mongoose = require('mongoose'),

const models = {
    User: mongoose.model('User'),
    Entreprise: mongoose.model('Entreprise')
}
module.exports = models;
