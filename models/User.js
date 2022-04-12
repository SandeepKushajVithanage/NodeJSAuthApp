const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const User = mongoose.Schema({
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', User);