//Timothy Carta, Victoria Gorski, Julia Wilkinson
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	account_type: {
		type: String,
		required: true,
		enum: ['PROFESSOR', 'STUDENT'],
		default: 'STUDENT',
	},
	class: {
		type: [{ type: Schema.Types.ObjectId, ref: 'classes' }],
		required: true,
	},
});
var accountSchema = mongoose.model('accounts', accountSchema);

accountSchema.plugin(passportLocalMongoose);

module.exports = accountSchema;
