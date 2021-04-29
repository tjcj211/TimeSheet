var express = require('express');
var accountRouter = express.Router();
let Account = require('../Models/account');
const mongoose = require('mongoose');

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
	.route('/:accountId/')
	//Get an account with a specific ID
	.get((req, res, next) => {
		Account.findById(req.params.accountId)
			.populate('class')
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

accountRouter.route('/:username').get((req, res, next) => {
	Account.find({ username: req.params.username })
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

module.exports = accountRouter;
