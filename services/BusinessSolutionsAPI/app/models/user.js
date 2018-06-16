const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: string,
        required: true  
    },
    password: {
        type: String,
        required: true
    },
    entreprise: {}
});