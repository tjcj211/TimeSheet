var express = require('express');
var professorRouter = express.Router();
const mongoose = require('mongoose');
let Account = require('../Models/account');
let Class = require('../Models/class');
const lessonSchema = require('../Models/lesson');
let Lesson = require('../Models/lesson');
let Record = require('../Models/record');

professorRouter
	.route('/')
	//Get all professor accounts
	.get((req, res, next) => {
		Account.find({ account_type: 'PROFESSOR' })
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
	})
	//Add a new professor account
	.post((req, res, next) => {
		const account = new Account({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			account_type: req.body.account_type,
			class: req.body.class,
		});
		account
			.save()
			.then((result) => {
				console.log(result);
				res.status(201).json({ result });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err });
			});
	});

professorRouter
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
	})
	//delete an account with a specific id
	.delete((req, res, next) => {
		Account.remove({ _id: req.params.accountId })
			.exec()
			.then((result) => {
				res.status(200).json(result);
			});
	});

professorRouter
	.route('/:accountId/classes')
	//get all classes for the professor
	.get((req, res, next) => {
		Account.findById(req.params.accountId, (err, account) => {
			if (err) throw err;
			res.json(account.class);
		}).populate('class');
	})
	.post((req, res, next) => {
		const clas = new Class({
			name: req.body.name,
			class_code: req.body.class_code,
			lesson: req.body.lesson,
		});
		clas.save()
			.then((result) => {
				console.log(result);
				res.status(201).json({ result });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err });
			});
		Account.findByIdAndUpdate(req.params.accountId, {
			$push: { class: clas._id },
		}).exec();
	});

professorRouter
	.route('/:accountId/classes/:classId/')
	//get a specific class by ID
	.get((req, res, next) => {
		Class.findById(req.params.classId, (err, classes) => {
			if (err) throw err;
			res.json(classes);
		}).populate('lesson');
	});

professorRouter
	.route('/:accountId/classes/:classId/lessons')
	//get all lessons for the given class
	.get((req, res, next) => {
		Class.findById(req.params.classId, (err, clas) => {
			if (err) throw err;
			res.json(clas.lesson);
		}).populate('lesson');
	})
	.post((req, res, next) => {
		const lesson = new Lesson({
			name: req.body.name,
			due_date: req.body.due_date,
			record: req.body.record,
		});
		lesson
			.save()
			.then((result) => {
				console.log(result);
				res.status(201).json({ result });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err });
			});
		Class.findByIdAndUpdate(req.params.classId, {
			$push: { lesson: lesson._id },
		}).exec();
	});

professorRouter
	.route('/:accountId/classes/:classId/lessons/:lessonId')
	.put((req, res, next) => {
		Lesson.remove({ _id: req.params.lessonId }).exec();
		const lesson = new Lesson({
			name: req.body.name,
			due_date: req.body.due_date,
			record: req.body.record,
		});
		lesson
			.save()
			.then((result) => {
				console.log(result);
				res.status(201).json({ result });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err });
			});
		Class.findByIdAndUpdate(req.params.classId, {
			$push: { lesson: lesson._id },
		}).exec();
	})
	//delete an lesson with a specific id
	.delete((req, res, next) => {
		Lesson.remove({ _id: req.params.lessonId })
			.exec()
			.then((result) => {
				res.status(200).json(result);
			});
	});

professorRouter
	.route('/:accountId/classes/:classId/lessons/:lessonId/records')
	//get all records
	.get((req, res, next) => {
		Lesson.findById(req.params.lessonId, (err, lessons) => {
			if (err) throw err;
			res.json(lessons.record);
		}).populate('record');
	});

module.exports = professorRouter;
