const User = require('../models/user.model');
const validations = require('../validations/validations');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SIGNUP
const signup = (req, res) => {

    // Name Validation
    const nameValidResult = validations.nameValidation(req.body.name);
    if (nameValidResult.required) {
        return res.status(400).send({
            message: 'Name required'
        })
    }

    // Email Validation
    const emailValidResult = validations.emailValidation(req.body.email);
    if (emailValidResult.required) {
        return res.status(400).send({
            message: 'Email required'
        })
    } else if (emailValidResult.invalid) {
        return res.status(400).send({
            message: 'Invalid email'
        })
    }

    // Password Validation
    const passwordValidResult = validations.passwordValidation(req.body.password);
    if (passwordValidResult.required) {
        return res.status(400).send({
            message: 'Password required'
        })
    } else if (passwordValidResult.invalid) {
        return res.status(400).send({
            message: 'Please user strong password'
        })
    }

    // Mobile Number Validation
    const mobileValidResult = validations.mobileNumberValidation(req.body.mobile);
    if (mobileValidResult.required) {
        return res.status(400).send({
            message: 'Mobile number required'
        })
    } else if (mobileValidResult.invalid) {
        return res.status(400).send({
            message: 'Invalid mobile number'
        })
    } else if (mobileValidResult.lengthInvalid) {
        return res.status(400).send({
            message: 'Mobile number should accept only minimum 3 characters and maximum 10 characters'
        })
    }

    // Check Db for user exist or not
    User.findOne({email: req.body.email}, (err, DBuser) => {
        if (err) {
            return res.status(500).send({
                error: err,
                message: 'Something went wrong, please try again later'
            })
        } else {
            if (DBuser) {
                return res.status(400).send({
                    error: true,
                    message: 'User already exists'
                })
            } else {

                // create hash of password
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        mobile: req.body.mobile
                    });

                    user.save()
                        .then(() => {
                            return res.status(201).send({
                                error: false,
                                message: 'User created successfully !'
                            })
                        })
                        .catch((err) => {
                            return res.status(500).send({
                                error: err,
                                message: 'Something went wrong please try again later'
                            })
                        })
                });
            }
        }
    })
};

// LOGIN
const login = (req, res) => {

    // Email Validation
    const emailValidResult = validations.emailValidation(req.body.email);
    if (emailValidResult.required) {
        return res.status(400).send({
            message: 'Email required'
        })
    } else if (emailValidResult.invalid) {
        return res.status(400).send({
            message: 'Invalid email'
        })
    }

    // Password Validation
    const passwordValidResult = validations.passwordValidation(req.body.password);
    if (passwordValidResult.required) {
        return res.status(400).send({
            message: 'Password required'
        })
    } else if (passwordValidResult.invalid) {
        return res.status(401).send({
            message: 'Unauthorised access'
        })
    }


    User.findOne({email: req.body.email}, (err, DBuser) => {
        if (err) {
            return res.status(500).send({
                error: err,
                message: 'Something went wrong, please try again later'
            })
        } else {
            if (DBuser) {
                bcrypt.compare(req.body.password, DBuser.password, (err, result) => {
                    if (result) {
                        // generate access token here
                        const token = jwt.sign({id: DBuser._id}, 'AccessTokenPassword', {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        res.send({
                            error: false,
                            id:  DBuser._id,
                            name: DBuser.name,
                            message: 'User successfully logged in',
                            token: token
                        })
                    } else {
                        return res.status(401).send({
                            error: result,
                            message: 'Unauthorised access'
                        })
                    }
                })
            } else {
                return res.status(401).send({
                    message: 'Unauthorised access'
                })
            }
        }
    })
};


module.exports.signup = signup;
module.exports.login = login;
