//Timothy Carta, Victoria Gorski, Julia Wilkinson
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var recordSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["HOMEWORK", "EXAM PREP", "STUDYING"],
    default: "HOMEWORK",
  },
  minutes: {
    type: Number,
    required: true,
  },
  studentid: {
    type: { type: Schema.Types.ObjectId, ref: "account" },
  },
});
var recordSchema = mongoose.model("records", recordSchema);
module.exports = recordSchema;
