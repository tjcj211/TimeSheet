//Timothy Carta, Victoria Gorski, Julia Wilkinson
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const record = require('../Models/record');

var lessonSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	record: {
		type: [{ type: Schema.Types.ObjectId, ref: 'records' }],
		required: true,
	},

	due_date: {
		type: Date,
		required: true,
	},
});
var lessonSchema = mongoose.model('lessons', lessonSchema);
module.exports = lessonSchema;
