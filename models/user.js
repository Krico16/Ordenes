var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, 10, (err , hash) => {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});


var User = mongoose.model('User', UserSchema);

module.exports = User;