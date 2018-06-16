const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema({
    entrepriseName: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tel: {
        type: string,
        required: true  
    },
    password: {
        type: String,
        required: true
    }
});