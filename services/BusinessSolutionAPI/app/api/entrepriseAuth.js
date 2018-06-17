const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('@config');
      
const api = {};

//Login method
api.login = (Entreprise) => (req, res) => {
    Entreprise.findOne({ entrepriseName: req.body.entrepriseName }, (error, entreprise) => {
        if (error) throw error;
        if (!entreprise) { 
            res.status(401).send({ success: false, message: 'Authentication failed. Entreprise not found.' });
        } 
        else {
            entreprise.comparePassword(req.body.password, (error, matches) => {
                if (matches && !error) {
                    const token = jwt.sign({ entreprise }, config.secret);
                    res.json({ success: true, message: 'Token granted', token });
                } else {
                    res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
}

