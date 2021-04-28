var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');

var accountRouter = require('./routes/accounts');
var classRouter = require('./routes/classes');
var recordRouter = require('./routes/record');
var studentRouter = require('./routes/student');
var professorRouter = require('./routes/professor');

var mongoose = require('mongoose');
const connectionParams = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
};
//var uri = 'mongodb+srv://dbuser:158skunkJR21!@cluster0.c0anp.mongodb.net/StudentSheet?retryWrites=true&w=majority';
var uri = `mongodb+srv://${config.database.username}:${config.database.password}@${config.database.host}`;
mongoose
	.connect(uri, connectionParams)
	.then(() => {
		console.log('Connected to database ');
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
	});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
	console.log('Connected to MongoDB');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/account', accountRouter);
app.use('/classes', classRouter);
app.use('/records', recordRouter);
app.use('/student', studentRouter);
app.use('/professor', professorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
