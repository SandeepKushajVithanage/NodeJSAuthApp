const express = require('express');

const authentication = require('../middlewares/authentication');

const router = express.Router();

router.get('/', authentication.verifyUser, (req, res, next) => {
    res.send('Success');
});

module.exports = router;