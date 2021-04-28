var express = require('express');
var studentRouter = express.Router();
const mongoose = require('mongoose');
let Account = require('../Models/account');
let Class = require('../Models/class');
let Lesson = require('../Models/lesson');
let Record = require('../Models/record');

studentRouter
	.route('/')
	//Get all student accounts
	.get((req, res, next) => {
		Account.find({ account_type: 'STUDENT' })
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
	//Add a new student account
	.post((req, res, next) => {
		const account = new Account({
			_id: mongoose.Types._ObjectId,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			account_type: req.body.accountType,
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

studentRouter
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

studentRouter
	.route('/:accountId/classes')
	//get all classes for the student
	.get((req, res, next) => {
		Account.findById(req.params.accountId, (err, account) => {
			if (err) throw err;
			res.json(account.class);
		}).populate('class');
	});

studentRouter
	.route('/:accountId/classes/:classId/')
	//get a specific class by ID
	.get((req, res, next) => {
		Class.findById(req.params.classId, (err, classes) => {
			if (err) throw err;
			res.json(classes);
		}).populate('lesson');
	})
	.put((req, res, next) => {
		Account.findByIdAndUpdate(req.params.accountId, {
			$push: { class: req.params.classId },
		}).exec();
		res.end();
	});

studentRouter
	.route('/:accountId/classes/:classId/lessons')
	//get all lessons for the given class
	.get((req, res, next) => {
		Class.findById(req.params.classId, (err, clas) => {
			if (err) throw err;
			res.json(clas.lesson);
		}).populate('lesson');
	});

studentRouter
	.route('/:accountId/classes/:classId/lessons/:lessonId/records')
	//get all records for the lesson class
	.get((req, res, next) => {
		Lesson.findById(req.params.lessonId, (err, lesson) => {
			if (err) throw err;
			res.json(lesson.record);
		});
	})
	.post((req, res, next) => {
		const record = new Record({
			type: req.body.type,
			minutes: req.body.minutes,
			studentId: req.body.studentId,
		});
		record
			.save()
			.then((result) => {
				console.log(result);
				res.status(201).json({ result });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err });
			});
		Lesson.findByIdAndUpdate(req.params.lessonId, {
			$push: { record: record._id },
		}).exec();
	});

module.exports = studentRouter;
