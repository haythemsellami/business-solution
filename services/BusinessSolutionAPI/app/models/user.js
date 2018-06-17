const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true
    },
    entreprise: { 
      type: Schema.Types.ObjectId, 
      ref: 'Entreprise' 
    }
});

userSchema.pre('save', function (next) {
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

userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, matches) => {
      if (error) return callback(error);
      callback(null, matches);
    });
};

mongoose.model('User', userSchema);

  