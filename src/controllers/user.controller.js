const User = require('../models/user.model');
const validations = require('../validations/validations');

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


    User.find({email: req.body.email}, (err, user) => {
        console.log(err)
        console.log(user)
    })


};

// LOGIN
const login = (req, res) => {

};


module.exports.signup = signup;
