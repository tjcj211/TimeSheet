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
 record.find({}, (err, record) => {
      if (err) throw err;
      res.json (record);
    });
    res.end();
  })
  .post((req, res, next) => {
 record.create(req.body, (err, record) => {
      if (err) throw err;

      console.log("Record Created");
    });
    res.end();
  });
recordRouter.route("/account/:id/classes/:classId/lessons/:lesson/records/:recordId")
.put((req,res,next) => {
  record.findByIdAndUpdate(req.params.recordId, {$set: req.body}, {new: true}, (err, record) => {
    if (err) throw err;
    res.json(record);
  });
});

module.exports = recordRouter;
