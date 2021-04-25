exports.database = {
	database: process.env.DATABASE_NAME || 'recipesDB',
	username: process.env.DATABASE_USER || 'dbUser',
	password: process.env.DATABASE_PASSWORD || '9Sd-qaED-d-374Q',
	host:
		process.env.DATABASE_SERVER ||
		'ser320.7xzxo.mongodb.net/timesheetDB?retryWrites=true&w=majority',
};
