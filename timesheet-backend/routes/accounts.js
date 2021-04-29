var express = require("express");
var accountRouter = express.Router();
let Account = require("../Models/account");
const mongoose = require("mongoose");
var Verify = require("./verify");
var passport = require("passport");
var config = require("../config.js");

accountRouter.get("/logout", (req, res) => {
  req.logout();
  console.log("trying to log out");
  res.status(200).json({
    status: "Bye!",
  });
});

accountRouter.route("/").get((req, res, next) => {
  Account.find({})
    .populate("class")
    .exec()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

accountRouter
  .route("/:accountId/")
  //Get an account with a specific ID
  .get((req, res, next) => {
    Account.findById(req.params.accountId)
      .populate("class")
      .exec()
      .then((account) => {
        res.status(200).json(account);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });

accountRouter.post("/register", async function (req, res) {
  Account.register(
    new Account({
      username: req.body.username,
      email: req.body.email,
    }),
    req.body.password,
    function (err, account) {
      if (err) return res.status(500).json({ err: err });

      passport.authenticate("local")(req, res, function () {
        var token = Verify.getToken(account);

        return res
          .status(200)
          .header("x-access-token", token)
          .header("access-control-expose-headers", "x-access-token")
          .json({ status: "Registration Successful!" });
      });
    }
  );
});

accountRouter.post("/login", (req, res, next) => {
  //req.body will have username and password
  passport.authenticate("local", function (err, account, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!account) {
      console.log(account);
      console.log("authentication failure");
      return res.status(401).json({ err: info });
    }
    req.logIn(account, function (err) {
      if (err) return res.status(500).json({ err: "Could not log in account" });

      console.log("account in accounts: ", account);

      var token = Verify.getToken(account);
      "secretKey",
        {
          expiresIn: "1h",
        };

      res.status(200);
      res.send(token);
    });
  })(req, res, next);
});

module.exports = accountRouter;
