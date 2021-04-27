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

module.exports = accountRouter;
