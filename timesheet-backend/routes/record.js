var express = require('express');
var recordRouter = express.Router();
let Record = require('../Models/record');
const mongoose = require('mongoose');
recordRouter
	.route('/:studentId')
	//Get all professor accounts
	.get((req, res, next) => {
		Record.find({ studentId: req.params.studentId })
			.exec()
			.then((record) => {
				res.status(200).json(record);
			})
			.catch((err) => {
				res.status(500).json({
					error: err,
				});
			});
	});

module.exports = recordRouter;
