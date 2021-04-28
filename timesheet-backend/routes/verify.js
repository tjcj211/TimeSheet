var jwt = require('jsonwebtoken');
var config = require('../config.js');

// Returns signed token
exports.getToken = function (student) {
    return jwt.sign(student, config.secretKey, {
        expiresIn: 3600
    });
};
    exports.verifyUser = function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
                jwt.verify(token, config.secretKey, (err, decoded) => {
                    if (err) {
                        const err = new Error('You cannot be logged in');
                        err.status = 401;
                        return next(err);
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
                
        } else {
            var err = new Error('No token has been given!');
            err.status = 403;
            return next(err);
        }
    }


