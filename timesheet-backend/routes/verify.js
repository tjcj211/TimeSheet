var jwt = require("jsonwebtoken");
var config = require("../config.js");
const secretKey = "54544-76476-90490-87467";

exports.getToken = function (account) {
  return jwt.sign(account.toJSON(), secretKey, {
    expiresIn: 3600,
  });
};

exports.verifyOrdinaryAccount = function (req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        var err = new Error("You are not authenticated !");
        err.status = 401;
        return next(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    var err = new Error("No token provided!");
    err.status = 403;
    return next(err);
  }
  console.log("user verified");
};

exports.verifyProfessor = function (req, res, next) {
  console.log(req.decoded);
  if (req.decoded.isProfessor) {
    console.log("professor verified");
    next();
  } else {
    var err = new Error("You are not authorized!");
    err.status = 403;
    return next(err);
  }
};
