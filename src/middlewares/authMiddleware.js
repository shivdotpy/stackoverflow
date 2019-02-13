const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Authorise user here
    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[1], 'AccessTokenPassword', function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Unauthorised access' });
            next()
        });
    } else {
        return res.status(401).send({
            message: 'Unauthorised access'
        })
    }
};


module.exports = authMiddleware;
