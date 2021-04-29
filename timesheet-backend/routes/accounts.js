var express = require('express');
var accountRouter = express.Router();
let account = require('../Models/account');
const mongoose = require('mongoose');
const { Router } = require('express');

accountRouter.route('/').get((req, res, next) => {
	Account.find({})
		.populate('class')
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
	.route('/')
	.all((req, res, next) => {
		next();
	})
	.get((req, res, next) => {
		account.find({}, (err, account) => {
			if (err) throw err;
			res.json(account);
		});
		res.end();
	})
	.post((req, res, next) => {
		account.create(req.body, (err, account) => {
			if (err) throw err;
			console.log('Account Created');
		});
		res.end();
	})
	.put((req, res, next) => {
		account.findByIdAndUpdate(
			req.params.accountId,
			{ $set: req.body },
			{ new: true },
			(err, account) => {
				if (err) throw err;
				res.json(lesson);
			}
		);
	});
	// register
	accountRouter.post('/register', function(req, res) {
		Account.register(
			new Account({username: req.body.username}), req.body.password, function(err, account) {
				if (err) return res.status(500).json({err: err});
				if (req.body.username) {
					account.username = req.body.username;
				};
				if (req.body.password) {
					account.password = req.body.password;
				};
				if (req.body.email) {
					account.email = req.body.email;
				};
				passport.authenticate("local")(req, res,  () => {
					var token = verify.getToken(account);
					return res
					.status(200)
					.header("x-access-token", token)
					.header("access-control-expose-headers", "x-access-token")
					.json({status: "Your account has successfully been registered."});
				});
			} 
			
		)
	});

	// User login 
	accountRouter.post('/login', function(req, res, next) {
		passport.authenticate("local",(err, account, info) => {
			if(err) {
				console.log(err);
				return next(err);
			} 
			
			if (!account) {
				console.log("The account does not exist");
				return res.status(401).json({err: "This account does not exist."});
				
			}

			req.login(account, function (err) {
				if (err) {
					return res.status(500).json({err: "The account cannot be logged out of."});
				}
			})

			const token = verify.getToken(account);
				res.status(200);
				res.send(token);


		}) (req, res, next);

	});

	// Logout
	accountRouter.get('/logout', function(req, res) {
		req.logout();
		res.status(200).json ({
			status: 'Thank you!'
		});
	});

	

module.exports = accountRouter;
