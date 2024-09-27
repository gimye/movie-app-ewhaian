const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const SECRET_KEY = "abcd!!!333";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

});

userSchema.statics.findByToken = function (token, callback) {
    const user = this;

    jwt.verify(token, SECRET_KEY, function (err, decoded) { 

        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return callback(err);
            callback(null, user);
        });

    });
}

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        else return callback(null, isMatch);
    });
}

userSchema.methods.generateToken = function (cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), SECRET_KEY);

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    });
}



const User = mongoose.model('User', userSchema);

module.exports = { User }