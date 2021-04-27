var express = require("express");
var recordRouter = express.Router();
let record = require("../Models/record");
const mongoose = require("mongoose");
recordRouter
  .route("/account/:id/classes/:class/lessons/:lesson/records/")
  .all((req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    console.log("getting records");
    record.find({}, (err, record) => {
      if (err) throw err;
      res.json(record);
    });
    res.end();
  })
  .post((req, res, next) => {
    record.create(req.body, (err, record) => {
      if (err) throw err;
      res.json(record);
      console.log("Record Created");
    });
    res.end();
  });
recordRouter
  .route("/account/:id/classes/:class/lessons/:lesson/records/:recordId")
  .get((req, res, next) => {
    /* console.log("getting record");
    record
      .findById(req.params.recordId)
      .populate("records")
      .exec((err, lesson) => {
        console.log(lesson.records);
        if (err) throw err;
        const record = lesson.records.find((a) => {
          console.log(a._id + " " + req.params.recordId);
          return a._id.toString() === req.params.recordId;
        });
        console.log("record: " + record);
        res.json(record);
      }); */
    record.findById(req.params.recordId, (err, record) => {
      if (err) throw err;
      res.json(record);
    });
    // res.end();
  })
  .put((req, res, next) => {
    record.findByIdAndUpdate(
      req.params.recordId,
      { $set: req.body },
      { new: true },
      (err, record) => {
        if (err) throw err;
        res.json(record);
      }
    );
  });

recordRouter.route("/records/:recordId").get((req, res, next) => {
  record.findById(req.params.recordId, (err, record) => {
    if (err) throw err;
    res.json(record);
  });
  res.end();
});

module.exports = recordRouter;
