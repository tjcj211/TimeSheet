//Timothy Carta, Victoria Gorski, Julia Wilkinson
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const record = require("../Models/record");
var recordSchema = require("mongoose").model("records").schema;
var lessonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  record: {
    //type: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
    type: [recordSchema],
    required: false,
  },

  due_date: {
    type: Date,
    required: false,
  },
});
var lessonSchema = mongoose.model("lessons", lessonSchema);

module.exports = lessonSchema;
