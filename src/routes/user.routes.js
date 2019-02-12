const express = require('express');
const router = express.Router();

// CONTROLLERS
const User = require('../controllers/user.controller');


router.post('/signup', User.signup);


module.exports = router;
