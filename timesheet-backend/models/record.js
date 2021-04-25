//Timothy Carta, Victoria Gorski, Julia Wilkinson
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var recordSchema = new Schema({
	type: {
		type: String,
		required: true,
		enum: ['HOMEWORK', 'EXAM PREP', 'STUDYING'],
		default: 'HOMEWORK',
	},
	minutes: {
		type: Number,
		required: true,
	},
});
var recordSchema = mongoose.model('records', recordSchema);
module.exports = recordSchema;
