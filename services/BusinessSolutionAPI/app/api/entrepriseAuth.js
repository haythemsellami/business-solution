const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('@config');
      
const api = {};

//Login method
api.login = (Entreprise) => (req, res) => {
    mongoose.model('Entreprise').findOne({ entrepriseName: req.body.entrepriseName }, (error, entreprise) => {
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

//token verification method
api.verify = (headers) => {
    if (headers && headers.authorization) {
        const split = headers.authorization.split(' ');
        if (split.length === 2) { 
            return split[1];
        }
        else { 
            return null;
        }
    } 
    else { 
        return null;
    }
}

//signup method
api.signup = (Entreprise) => (req, res) => {
    if (!req.body.entrepriseName || !req.body.password || !req.body.address || !req.body.tel) {
        res.json({ success: false, message: 'Please, fill all information.' });
    }
    else {
      const newEntreprise = new Entreprise({
        entrepriseName: req.body.entrepriseName,
        address: req.body.address,
        tel: req.body.tel,
        password: req.body.password
      });
      newUser.save((error) => {
        if (error) return res.status(400).json({ success: false, message:  'Entreprise name already exists.' });
        res.json({ success: true, message: 'Account created successfully' });
      })
    }
}
  
//Entreprise indexing
api.index = (Entreprise, BusinessToken) => (req, res) => {
    const token = BusinessToken;
    if (token) {
        Entreprise.find({}, (error, companies) => {
            if (error) throw error;
            res.status(200).json(companies);
        });
    } 
    else {
        return res.status(403).send({ success: false, message: 'Unauthorized' });
    }
}


