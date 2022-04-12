const passport = require('passport');
const passportLocal = require('passport-local');
const jwt = require('jsonwebtoken');
const passportJwt = require('passport-jwt');

const User = require('../models/User');
const config = require('../config');

const localStratrgy = passportLocal.Strategy;
const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

exports.local = passport.use(new localStratrgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => jwt.sign(user, config.SECRET_KEY, { expiresIn: 3600 });

let opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_KEY,
};

exports.jwtPassport = passport.use(new jwtStrategy(opts, (jwtPayload, done) => {
    console.log('JWT payload', jwtPayload);
    User.findOne({ _id: jwtPayload._id }, (err, user) => {
        if (err) {
            return done(err, false);
        } else if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}));

exports.verifyUser = passport.authenticate('jwt', { session: false });