const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const authentication = require('./middlewares/authentication');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config');
const users = require('./routes/users');
const test = require('./routes/test');

const connect = mongoose.connect(config.MONGO_DB_URL);

connect.then((db) => console.log('MongoDB connected!'), (err) => console.log(err));

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', users);
app.use('/api/test', test);

app.listen(8000, () => {
    console.log(`Server is running at http://localhost:8000/`);
});
