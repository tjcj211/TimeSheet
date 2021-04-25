var express = require('express');
var classRouter = express.Router();
let classes = require('../Models/class');
const mongoose = require('mongoose');

classRouter
	.route('/:id/classes/')
	.all((req, res, next) => {
		next();
	})
	.get((req, res, next) => {
		classes.find({}, (err, classes) => {
			if (err) throw err;
			res.json(classes);
		});
		res.end();
	});
classRouter
	.route('/:id/classes/:class/')
	.get((req, res, next) => {
		classes.find({}, (err, classes) => {
			if (err) throw err;
			res.json(classes);
		});
		res.end();
	})
	.post((req, res, next) => {
		classes.create(req.body, (err, classes) => {
			if (err) throw err;

			console.log('Account Created');
		});
		res.end();
	});

module.exports = classRouter;
