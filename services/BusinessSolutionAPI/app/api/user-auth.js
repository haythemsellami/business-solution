const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      config = require('@config');

const api = {};

//Login method
api.login = (User) => (req, res) => {
    User.findOne({ username: req.body.username }, (error, user) => {
        if (error) throw error;
        if (!user) { 
            res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
        } 
        else {
            user.comparePassword(req.body.password, (error, matches) => {
                if (matches && !error) {
                    const token = jwt.sign({ user }, config.secret);
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
api.signup = (User) => (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname) {
        res.json({ success: false, message: 'Please, fill all information.' });
    }
    else {
      const newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
      });
      newUser.save((error) => {
        if (error) return res.status(400).json({ success: false, message:  'Username already exists.' });
        res.json({ success: true, message: 'Account created successfully' });
      })
    }
}
  
api.index = (User, BudgetToken) => (req, res) => {
    const token = BudgetToken;
    if (token) {
        User.find({}, (error, users) => {
            if (error) throw error;
            res.status(200).json(users);
        });
    } 
    else {
        return res.status(403).send({ success: false, message: 'Unauthorized' });
    }
}

module.exports = api;

  