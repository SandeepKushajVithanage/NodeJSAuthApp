const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const User = require('../models/User');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Response');
});

router.post('/signup', (req, res, next) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
           res.statusCode = 500;
           res.setHeader('Content-Type', 'application/json');
           res.json({ err });
        } else {
            passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ user });
            });
        }
    });
});

router.post('/signin', passport.authenticate('local'), (req, res, next) => {
    const token = authentication.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ token });
});

module.exports = router;