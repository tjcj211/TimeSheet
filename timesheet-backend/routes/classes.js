var express = require('express');
var classRouter = express.Router();
let Class = require('../Models/class');
const mongoose = require('mongoose');

classRouter.route('/:classCode').get((req, res, next) => {
	Class.find({ class_code: '426-233' })
		.populate('lesson')
		.exec()
		.then((clas) => {
			res.status(200).json(clas);
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
});
module.exports = classRouter;
