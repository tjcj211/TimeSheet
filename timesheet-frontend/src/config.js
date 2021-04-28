exports.database = {
	database: process.env.DATABASE_NAME || 'timesheetDB',
	username: process.env.DATABASE_USER || 'dbUser',
	password: process.env.DATABASE_PASSWORD || '9Sd-qaED-d-374Q',
	host:
		process.env.DATABASE_SERVER ||
		'ser320.7xzxo.mongodb.net/timesheetDB?retryWrites=true&w=majority',
};

module.exports = {
	'secretKey' : '11111 - 22222 - 33333 - 44444 - 55555',
	'mongoUrl' : 'mongodb+srv://dbuser:158skunkJR21!@cluster0.c0anp.mongodb.net/StudentSheet?retryWrites=true&w=majority' 
}
