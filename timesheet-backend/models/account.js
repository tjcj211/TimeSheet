//Timothy Carta, Victoria Gorski, Julia Wilkinson
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var accountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  account_type: {
    type: String,
    required: false,
    enum: ["PROFESSOR", "STUDENT"],
    default: "STUDENT",
  },
  class: {
    type: [{ type: Schema.Types.ObjectId, ref: "classes" }],
    required: false,
  },
});

accountSchema.plugin(passportLocalMongoose);
//var accounts = mongoose.model("Account", accountSchema);
module.exports =
  mongoose.models.Account || mongoose.model("Account", accountSchema);
