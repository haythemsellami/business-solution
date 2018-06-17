const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
entrepriseSchema = Schema({
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
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true
    },

    users: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ]

});

entrepriseSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);
        user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });
  
entrepriseSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, matches) => {
        if (error) return callback(error);
        callback(null, matches);
    });
};

mongoose.model('Entreprise', entrepriseSchema);
