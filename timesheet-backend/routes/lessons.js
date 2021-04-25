var express = require("express");
var lessonRouter = express.Router();
let lesson = require("../Models/lesson");
const mongoose = require("mongoose");

lessonRouter
  .route("/account/:id/classes/:class/lessons/:lesson")
  .all((req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    lesson.find({}, (err, lesson) => {
      if (err) throw err;
      res.json(lesson);
    });
    res.end();
  })
  .post((req, res, next) => {
    lesson.create(req.body, (err, lesson) => {
      if (err) throw err;

      console.log("lesson Created");
    });
    res.end();
  })
  .put((req,res,next) => {
    lesson.findByIdAndUpdate(req.params.lessonId, {$set: req.body}, {new: true}, (err, lesson) => {
      if (err) throw err;
      res.json(lesson);
    });
  });

module.exports = lessonRouter;
